'use strict'

module.exports = {
  up: async function up(queryInterface, Sequelize){
    const [results] = await queryInterface.sequelize.query("SELECT schema_name FROM information_schema.schemata where schema_name like '%company%'")
    for(let i in results){
      return queryInterface.sequelize.query(`create table ${results[i].schema_name}.typetravel (
        idtypetravel bigserial not null,
        typetravel varchar(256) not null,
        active bool not null default true,
        constraint pk_typeactivity primary key(idtypetravel)
      );`)
    }
  },

  down: async function down(queryInterface, Sequelize){
    const [results] = await queryInterface.sequelize.query("SELECT schema_name FROM information_schema.schemata where schema_name like '%company%'")
    for(let i in results){
      return queryInterface.dropTable({tableName: 'typetravel', schema: results[i].schema_name})
    }
  }
};