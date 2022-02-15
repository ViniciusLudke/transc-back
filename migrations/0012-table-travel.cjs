'use strict'

module.exports = {
  up: async function up(queryInterface, Sequelize){
    const [results] = await queryInterface.sequelize.query("SELECT schema_name FROM information_schema.schemata where schema_name like '%company%'")
    for(let i in results){
      try{
        await queryInterface.sequelize.query(`CREATE TABLE ${results[i].schema_name}.travel (
          idtravel bigserial NOT NULL,
          travel varchar(128) NOT NULL,
          active boolean default true,
          description text,
          usually smallint default 0,
          days smallint default 0,
          startdate date,
          starttime time,
          endtime time,
          idtypetravel bigint NOT NULL,
          CONSTRAINT pk_travel PRIMARY KEY (idtravel)
        );`)
      } catch(e) {
        console.log(e)
        throw e
      }
    }
  },

  down: async function down(queryInterface, Sequelize){
    const [results] = await queryInterface.sequelize.query("SELECT schema_name FROM information_schema.schemata where schema_name like '%company%'")
    for(let i in results){
      try{
        await queryInterface.dropTable({tableName: 'travel', schema: results[i].schema_name})
      } catch(e) {
        console.log(e)
        throw e
      }
    }
  }
};