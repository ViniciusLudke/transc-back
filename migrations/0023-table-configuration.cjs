'use strict'

module.exports = {
  up: async function up(queryInterface, Sequelize){
    const [results] = await queryInterface.sequelize.query("SELECT schema_name FROM information_schema.schemata where schema_name like '%company%'")
    for(let i in results){
      try{
        await queryInterface.sequelize.query(`CREATE TABLE ${results[i].schema_name}.configuration ( 
          idcompany bigint NOT NULL,
          company varchar(64) NOT NULL,
          mimetype varchar(64),
          photo bytea,
          CONSTRAINT pk_configuration PRIMARY KEY (idcompany)
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
        await queryInterface.dropTable({tableName: 'configuration', schema: results[i].schema_name})
      } catch(e) {
        console.log(e)
        throw e
      }
    }
  }

};
