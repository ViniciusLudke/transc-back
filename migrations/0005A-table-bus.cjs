'use strict'

module.exports = {
  up: async function up(queryInterface, Sequelize){
    const [results] = await queryInterface.sequelize.query("SELECT schema_name FROM information_schema.schemata where schema_name like '%company%'")
    for(let i in results){
      return queryInterface.sequelize.query(`CREATE TABLE ${results[i].schema_name}.bus (
        idbus bigserial NOT NULL,
        bus varchar(128) NOT NULL,
        simultaneous smallint NOT NULL default 0,
        active boolean default true,
        CONSTRAINT pk_bus PRIMARY KEY (idbus)
      );`)
    }
  },

  down: async function down(queryInterface, Sequelize){
    const [results] = await queryInterface.sequelize.query("SELECT schema_name FROM information_schema.schemata where schema_name like '%company%'")
    for(let i in results){
      return queryInterface.dropTable({tableName: 'occupation', schema: results[i].schema_name})
    }
  }
};