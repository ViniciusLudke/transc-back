'use strict'

module.exports = {
  up: async function up(queryInterface, Sequelize){
    const [results] = await queryInterface.sequelize.query("SELECT schema_name FROM information_schema.schemata where schema_name like '%company%'")
    for(let i in results){
      try{
        await queryInterface.sequelize.query(`ALTER TABLE ${results[i].schema_name}.travel ADD CONSTRAINT fk_travel_typetravel FOREIGN KEY (idtypetravel) REFERENCES ${results[i].schema_name}.typetravel(idtypetravel);`)
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
        await queryInterface.removeConstraint({tableName: 'travel', schema: results[i].schema_name}, 'fk_travel_typeactivity')
      } catch(e) {
        console.log(e)
        throw e
      }
    }
  }
};