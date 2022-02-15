'use strict';

module.exports = {
  up: async function up(queryInterface, Sequelize){
    return queryInterface.bulkInsert('company', [{
      idcompany: 1,
      company: 'TRANSCATTO',
      corporatename: 'TRANSCATTO TRANSPORTES LTDA'
    }])
  },

  down: async function down(queryInterface, Sequelize){
    return queryInterface.bulkDelete('company', null, {});
  }
};
