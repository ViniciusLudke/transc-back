'use strict'

module.exports = {
  up: async function up(queryInterface, Sequelize){
    return queryInterface.sequelize.query(`CREATE TABLE public.company (
      idcompany bigint NOT null,
      company varchar(64) NOT NULL,
      corporatename varchar(256) NOT null,
      active bool DEFAULT true,
      CONSTRAINT pk_company PRIMARY KEY (idcompany)
    );`)
  },

  down: async function down(queryInterface, Sequelize){
    return queryInterface.dropTable("company")
  }
};
