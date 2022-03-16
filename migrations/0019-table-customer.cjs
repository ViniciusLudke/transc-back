'use strict'

module.exports = {
  up: async function up(queryInterface, Sequelize){
    const [results] = await queryInterface.sequelize.query("SELECT schema_name FROM information_schema.schemata where schema_name like '%company%'")
    for(let i in results){
      try{
        await queryInterface.sequelize.query(`create table ${results[i].schema_name}.customer (
          idcustomer bigserial NOT NULL,
          name varchar(128) NOT NULL,
          email varchar(128) NOT null unique,
          password varchar(128) not null,
          language varchar(5) default 'pt-BR',
          token varchar(256),
          CONSTRAINT pk_customer PRIMARY KEY (idcustomer),
          CONSTRAINT un_customer_email UNIQUE (email)
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
        await queryInterface.dropTable({tableName: 'customer', schema: results[i].schema_name})
      } catch(e) {
        console.log(e)
        throw e
      }
    }
  }
};