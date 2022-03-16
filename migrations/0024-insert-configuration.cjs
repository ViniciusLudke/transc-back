'use strict'
const bcrypt = require('bcrypt')
module.exports = {
  up: async function up(queryInterface, Sequelize){
    const [results] = await queryInterface.sequelize.query("SELECT schema_name FROM information_schema.schemata where schema_name like '%company%'")
    for(let i in results){
      try{
        await queryInterface.bulkInsert({tableName: 'configuration', schema: results[i].schema_name}, [{
          idcompany: results[i].schema_name === 'company_0' ? 0 : 1,
          company: results[i].schema_name === 'company_0' ? 'Template' : 'Transcatto'
        }])
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
        await queryInterface.bulkDelete({tableName: 'configuration', schema:results[i].schema_name}, null, {})
      } catch(e) {
        console.log(e)
        throw e
      }
    }
  }
};
