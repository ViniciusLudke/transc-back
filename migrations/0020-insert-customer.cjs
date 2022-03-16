'use strict'
const bcrypt = require('bcrypt')
module.exports = {
  up: async function up(queryInterface, Sequelize){
    const [results] = await queryInterface.sequelize.query("SELECT schema_name FROM information_schema.schemata where schema_name like '%company%'")
    for(let i in results){
      try{
        const phash = await bcrypt.hash('mudar123', 8);
        await queryInterface.bulkInsert({tableName: 'customer', schema: results[i].schema_name}, [{
          name: 'Admin',
          email: 'admin@desbravador.com.br',
          password: phash,
          language: 'pt-BR',
        }], {})
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
        await queryInterface.bulkDelete({tableName: 'customer', schema:results[i].schema_name}, null, {})
      } catch(e) {
        console.log(e)
        throw e
      }
    }
  }
};
