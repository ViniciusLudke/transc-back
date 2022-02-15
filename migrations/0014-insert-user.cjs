'use strict'
const bcrypt = require('bcrypt')
module.exports = {
  up: async function up(queryInterface, Sequelize){
    const [results] = await queryInterface.sequelize.query("SELECT schema_name FROM information_schema.schemata where schema_name like '%company%'")
    for(let i in results){
      const phash = await bcrypt.hash('mudar123', 10);
      return queryInterface.bulkInsert({tableName: 'user', schema: results[i].schema_name}, [{
        name: 'admin',
        email: 'admin@admin.com',
        password: phash,
        language: 'pt-BR',
        idprofile: 1,
        idoccupation: 1
      }], {})
    }
  },

  down: async function down(queryInterface, Sequelize){
    const [results] = await queryInterface.sequelize.query("SELECT schema_name FROM information_schema.schemata where schema_name like '%company%'")
    for(let i in results){
      return queryInterface.bulkDelete({tableName: 'user', schema:results[i].schema_name}, null, {})
    }
  }
};
