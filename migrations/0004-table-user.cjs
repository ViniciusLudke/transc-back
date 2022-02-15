'use strict'

module.exports = {
  up: async function up(queryInterface, Sequelize){
    const [results] = await queryInterface.sequelize.query("SELECT schema_name FROM information_schema.schemata where schema_name like '%company%'")
    for(let i in results){
      return queryInterface.sequelize.query(`create table ${results[i].schema_name}.user (
        iduser bigserial not null,
        name varchar(128) not null,
        email varchar(128) unique not null,
        password varchar(128),
        active bool default true,
        token varchar(256),
        language varchar(5) default 'pt-BR',
        CONSTRAINT pk_user PRIMARY KEY (iduser)
      );`)
    }
  },

  down: async function down(queryInterface, Sequelize){
    const [results] = await queryInterface.sequelize.query("SELECT schema_name FROM information_schema.schemata where schema_name like '%company%'")
    for(let i in results){
      return queryInterface.dropTable({tableName: 'user', schema: results[i].schema_name})
    }
  }
};