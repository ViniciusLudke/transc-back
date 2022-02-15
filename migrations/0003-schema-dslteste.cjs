'use strict'

module.exports = {
  up: async function up(queryInterface, Sequelize){
    const company = await queryInterface.sequelize.query("Select idcompany from company where company.company = 'TRANSCATTO'", {raw:true})

    return queryInterface.createSchema(`company_${company[0][0].idcompany}`)
  },

  down: async function down(queryInterface, Sequelize){
    const company = await queryInterface.sequelize.query("Select idcompany from company where company.company = 'TRANSCATTO'",{raw:true})

    return queryInterface.dropSchema(`company_${company[0][0].idcompany}`)
  }
}
