'use strict';

module.exports = {
  up: async function up(queryInterface, Sequelize){
    const [results] = await queryInterface.sequelize.query("SELECT schema_name FROM information_schema.schemata where schema_name like '%company%'")
    for(let i in results){
      return queryInterface.bulkInsert({tableName: 'profile', schema: results[i].schema_name},[{
        profile: 'Financeiro'
      }], {})
    }
  },

  down: async function down(queryInterface, Sequelize){
    const [results] = await queryInterface.sequelize.query("SELECT schema_name FROM information_schema.schemata where schema_name like '%company%'")
    for(let i in results){
      return queryInterface.bulkDelete({tableName: 'profile', schema: results[i].schema_name}, null, {});
    }
  }
};
