'use strict'

module.exports = {
  up: async function up(queryInterface, Sequelize){
    const [results] = await queryInterface.sequelize.query("SELECT schema_name FROM information_schema.schemata where schema_name like '%company%'")
    for(let i in results){
      try{
        await queryInterface.sequelize.query(`create table ${results[i].schema_name}.schedulelog(
          idschedulelog bigserial,
          idschedule bigint not null,
          iduser bigint,
          idcustomer bigint,
          datetime timestamp not null,
          oldstatus smallint not null,
          newstatus smallint not null,
          reason text,
          CONSTRAINT pk_schedulelog PRIMARY KEY (idschedulelog),
          constraint fk_schedulelog_schedule foreign key (idschedule) references ${results[i].schema_name}.schedule(idschedule),
          constraint fk_schedulelog_user foreign key (iduser) references ${results[i].schema_name}.user(iduser),
          constraint fk_schedulelog_customer foreign key (idcustomer) references ${results[i].schema_name}.customer(idcustomer)
        )`)
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
        await queryInterface.dropTable({tableName: 'schedulelog', schema: results[i].schema_name})
      } catch(e) {
        console.log(e)
        throw e
      }
    }
  }
};