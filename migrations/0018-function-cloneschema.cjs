'use strict'

module.exports = {
  up: async function up(queryInterface, Sequelize){
    try{
        await queryInterface.sequelize.query(`CREATE OR REPLACE FUNCTION clone_schema(source_schema text, dest_schema text)
        RETURNS boolean
        LANGUAGE plpgsql
        COST 1
    AS $function$
    DECLARE
        object_ TEXT;
        buffer_ TEXT;
        default_ TEXT;
        column_ TEXT;
        name_ TEXT;
        varaux_ TEXT;
        tablefrom_ TEXT;
        columnfrom_ TEXT;
        schemato_ TEXT;
        tableto_ TEXT;
        columnto_ TEXT;
        match_option_ TEXT;
        update_rule_ TEXT;
        delete_rule_ TEXT;
        index_ TEXT;
        constraint_type_ TEXT;
        trigger_name_ TEXT;
        action_orientation_ TEXT;
        action_timing_ TEXT;
        action_statement_ TEXT;
        event_manipulation_ TEXT;
        text_view_ TEXT;
    BEGIN
        dest_schema = lower(dest_schema);
        EXECUTE 'CREATE SCHEMA "' || dest_schema || '"';
        EXECUTE 'SET SESSION SCHEMA ' || chr(39) || dest_schema || chr(39);
        -- Cria os sequences
        --------------------
        FOR object_ IN
            SELECT sequence_name FROM information_schema.sequences WHERE sequence_schema = source_schema
        LOOP
            EXECUTE 'select last_value, is_called from "' || source_schema || '".' || object_ INTO default_, varaux_;
            EXECUTE 'CREATE SEQUENCE "' || dest_schema || '".' || object_ || ' START ' || default_;
            IF (varaux_ = 't') OR (varaux_ = 'true') THEN -- (PG 9.349.5)
                EXECUTE 'select setval(' || chr(39) || dest_schema || '.' || object_ || chr(39) || ', ' || default_ || ', true)';
            END IF;
        END LOOP;
        -- Seção tabelas com os comentários e inserts
        ----------------------------------------------------------------
        -- Cria as tabelas com comentários das colunas
        FOR object_ IN
            SELECT table_name FROM information_schema.tables WHERE table_schema = source_schema AND table_type = 'BASE TABLE'
        LOOP
            buffer_ := '"' || dest_schema || '".' || object_;
            EXECUTE 'CREATE TABLE ' || buffer_ || ' (LIKE "' || source_schema || '".' || object_ || ' INCLUDING COMMENTS)';
            -- Adiciona os comentários das tabelas
            SELECT INTO varaux_ obj_description(('"' || source_schema || '".' || object_) ::regclass);
            IF (varaux_ IS NOT NULL AND length(varaux_) > 0) THEN
                EXECUTE 'COMMENT ON TABLE "' || dest_schema || '".' || object_ || ' IS ' || chr(39) || varaux_ || chr(39);
            END IF;
            -- Popula tabela
            EXECUTE 'INSERT INTO "' || dest_schema || '".' || object_ || ' SELECT * FROM "' || source_schema || '".' || object_;
        END LOOP;
        ----------------------------------------------------------------
        -- Cria índices
        FOR index_ IN
            SELECT
                indexdef AS index_
            FROM pg_indexes
            WHERE
                schemaname = source_schema AND
                indexname NOT LIKE 'un%' AND
                indexname NOT LIKE '%pk%' AND
                indexname NOT LIKE '%fk\_%'
        LOOP
            index_ := REPLACE(index_, source_schema, dest_schema);
            EXECUTE index_;
        END LOOP;
        -- Cria defaults das colunas
        FOR column_, default_, tablefrom_ IN
            SELECT
                column_name AS column_,
                REPLACE(column_default, source_schema, dest_schema) AS default_,
                table_name
            FROM information_schema.columns
            WHERE
                table_schema = source_schema AND
                column_default IS NOT NULL
        LOOP
            buffer_ := '"' || dest_schema || '".' || tablefrom_;
            default_ := REPLACE(default_, '"' || source_schema || '".', '"' || dest_schema || '".');
            default_ := REPLACE(default_, source_schema || '.', dest_schema || '.');
            EXECUTE 'ALTER TABLE ' || buffer_ || ' ALTER COLUMN ' || column_ || ' SET DEFAULT ' || default_;
        END LOOP;
        -- Cria PKs e Uniques
        FOR name_, constraint_type_, tablefrom_ IN
            SELECT
                tc.constraint_name AS name_,
                tc.constraint_type constraint_type_,
                tc.table_name tablename_
            FROM information_schema.table_constraints tc
            WHERE
                (tc.constraint_type = 'PRIMARY KEY' OR tc.constraint_type = 'UNIQUE') AND
                tc.constraint_schema = source_schema
        LOOP
            buffer_ := '"' || dest_schema || '".' || tablefrom_;
            columnto_ := '';
            FOR columnfrom_ IN
                SELECT
                    column_name AS columnfrom_
                FROM information_schema.key_column_usage
                WHERE
                    constraint_name = name_ AND
                    constraint_schema = source_schema
                ORDER BY ordinal_position
            LOOP
                columnto_ := columnto_ || columnfrom_ || ',';
            END LOOP;
            -- remove vírgula
            columnto_ := substr(columnto_, 1, (length(columnto_) - 1));
            EXECUTE 'ALTER TABLE ' || buffer_ || ' ADD CONSTRAINT ' || name_ || ' ' || constraint_type_ || ' (' || columnto_ || ')';
        END LOOP;
        -- Cria Foreigs Keys
        --------------------
        FOR name_, tablefrom_, columnfrom_, schemato_, tableto_, columnto_, match_option_, update_rule_, delete_rule_ IN
            SELECT
                DISTINCT tc.constraint_name AS name_,
                tc.table_name AS tablefrom_,
                kcu.column_name AS columnto_,
                ccu.table_schema AS schemato_,
                ccu.table_name AS tableto_,
                ccu.column_name AS columnto_,
                CASE WHEN rc.match_option = 'NONE' THEN 'SIMPLE' ELSE rc.match_option END AS math_option_,
                rc.update_rule AS update_rule_,
                rc.delete_rule AS delete_rule_
            FROM information_schema.table_constraints AS tc
            JOIN information_schema.key_column_usage AS kcu ON tc.constraint_name = kcu.constraint_name
            JOIN information_schema.constraint_column_usage AS ccu ON ccu.constraint_name = tc.constraint_name
            JOIN information_schema.referential_constraints AS rc ON rc.constraint_name = tc.constraint_name
            WHERE
                constraint_type = 'FOREIGN KEY' AND
                tc.constraint_schema = source_schema AND
                kcu.constraint_schema = source_schema AND
                ccu.constraint_schema = source_schema AND
                rc.constraint_schema = source_schema
        LOOP
            varaux_ = '"' || dest_schema || '"';
            IF (schemato_ = 'public') THEN
                varaux_ = schemato_;
            END IF;
            buffer_ := '"' || dest_schema || '".' || tablefrom_;
            EXECUTE 'ALTER TABLE ' || buffer_ || ' ADD CONSTRAINT ' || name_ ||
                ' FOREIGN KEY (' || columnfrom_ || ') REFERENCES ' || varaux_ || '.' || tableto_ || ' (' || columnto_ || ')'
                ' MATCH ' || match_option_ || ' ON UPDATE ' || update_rule_ || ' ON DELETE ' || delete_rule_ ;
        END LOOP;
        -- Cria Triggers
        ----------------
        FOR tablefrom_, trigger_name_, action_timing_, action_orientation_, action_statement_ IN
            SELECT
                event_object_table AS tablefrom_,
                trigger_name AS trigger_name_,
                action_timing AS action_timing_,
                action_orientation AS action_orientation_,
                action_statement AS action_statement_
            FROM information_schema.triggers
            WHERE
                trigger_schema = source_schema
            GROUP BY
                event_object_table,
                trigger_name,
                action_timing,
                action_orientation,
                action_statement
        LOOP
            buffer_ := '"' || dest_schema || '".' || tablefrom_;
            varaux_ := '';
            FOR event_manipulation_ IN
                SELECT
                    event_manipulation AS event_manipulation_
                from information_schema.triggers
                where
                    trigger_schema = source_schema AND
                    event_object_table = tablefrom_ AND
                    trigger_name = trigger_name_
            LOOP
                varaux_ := varaux_ || event_manipulation_ || ' OR ';
            END LOOP;
            varaux_ := substr(varaux_, 1, (length(varaux_) - 4));
            IF action_statement_ LIKE '%audit.aud_log%' THEN
                action_statement_ := REPLACE(action_statement_, source_schema, dest_schema);
            END IF;
            EXECUTE 'CREATE TRIGGER "' || trigger_name_ || '" ' ||
                action_timing_ || ' ' || varaux_ ||
                ' ON ' || buffer_ ||
                ' FOR EACH ' || action_orientation_ ||
                ' ' || action_statement_;
        END LOOP;
        -- Cria as VIEWs com comentários das colunas
        FOR object_ IN
            SELECT table_name FROM information_schema.tables WHERE table_schema = source_schema AND table_type = 'VIEW'
        LOOP
            buffer_ := '"' || dest_schema || '".' || object_;
                SELECT REPLACE(pg_get_viewdef(source_schema || '.' || object_), (source_schema || '.'), '') INTO text_view_;
            EXECUTE 'CREATE VIEW ' || buffer_ || ' AS ' || text_view_;
            -- Adiciona os comentários das tabelas
            SELECT INTO varaux_ obj_description(('"' || source_schema || '".' || object_) ::regclass);
            IF (varaux_ IS NOT NULL AND length(varaux_) > 0) THEN
                EXECUTE 'COMMENT ON VIEW "' || dest_schema || '".' || object_ || ' IS ' || chr(39) || varaux_ || chr(39);
            END IF;
        END LOOP;
        
        RETURN TRUE;
    END;
    $function$
    ;`)
    } catch(e) {
      console.log(e)
      throw e
    }
  },

  down: async function down(queryInterface, Sequelize){
    try{
        await queryInterface.dropFunction("clone_schema", [{type: "text", name:"source_schema", direction:"IN"}, {type:"text", name:"dest_schema", direction:"IN"}])
    } catch(e) {
    console.log(e)
    throw e
    }
  }

};
