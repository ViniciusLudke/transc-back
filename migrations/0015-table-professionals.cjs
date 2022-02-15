'use strict'

module.exports = {
  up: async function up(queryInterface, Sequelize){
    const [results] = await queryInterface.sequelize.query("SELECT schema_name FROM information_schema.schemata where schema_name like '%company%'")
    for(let i in results){
      try{
        await queryInterface.sequelize.query(`CREATE TABLE ${results[i].schema_name}.professional (
          idprofessional bigserial,
          iduser bigint not null,
          idtravel bigint not null,
          idbus bigint not null,
          CONSTRAINT pk_professional PRIMARY KEY (idprofessional),
          constraint fk_professional_user foreign key (iduser) references ${results[i].schema_name}.user(iduser),
          constraint fk_professional_travel foreign key (idtravel) references ${results[i].schema_name}.travel(idtravel),
          constraint fk_professional_bus foreign key (idbus) references ${results[i].schema_name}.bus(idbus)
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
        await queryInterface.dropTable({tableName: 'professional', schema: results[i].schema_name})
      } catch(e) {
        console.log(e)
        throw e
      }
    }
  }

};
