'use strict'

module.exports = {
  up: async function up(queryInterface, Sequelize){
    const [results] = await queryInterface.sequelize.query("SELECT schema_name FROM information_schema.schemata where schema_name like '%company%'")
    for(let i in results){
      return queryInterface.sequelize.query(`create table ${results[i].schema_name}.profile(
        idprofile bigserial not null,
        profile varchar(128) not null,
        CONSTRAINT pk_profile PRIMARY KEY (idprofile)
      );`)
    }
  },

  down: async function down(queryInterface, Sequelize){
    const [results] = await queryInterface.sequelize.query("SELECT schema_name FROM information_schema.schemata where schema_name like '%company%'")
    for(let i in results){
      return queryInterface.dropTable({tableName: 'profile', schema: results[i].schema_name})
    }
  }
};