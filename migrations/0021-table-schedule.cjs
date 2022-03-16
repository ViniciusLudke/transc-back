'use strict'

module.exports = {
  up: async function up(queryInterface, Sequelize){
    const [results] = await queryInterface.sequelize.query("SELECT schema_name FROM information_schema.schemata where schema_name like '%company%'")
    for(let i in results){
      try{
        await queryInterface.sequelize.query(`create table ${results[i].schema_name}.schedule(
          idschedule bigserial,
          idtravel bigint not null,
          idprofessional bigint not null,
          idcustomer bigint not null,
          date date not null,
          starttime time not null,
          endtime time not null,
          participant int default 0,
          person varchar(128) not null,
          status int default 0,
          CONSTRAINT pk_schedule PRIMARY KEY (idschedule),
          constraint fk_schedule_travel foreign key (idtravel) references ${results[i].schema_name}.travel(idtravel),
          constraint fk_schedule_professional foreign key (idprofessional) references ${results[i].schema_name}.professional(idprofessional),
          constraint fk_schedule_customer foreign key (idcustomer) references ${results[i].schema_name}.customer(idcustomer)
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
        await queryInterface.dropTable({tableName: 'schedule', schema: results[i].schema_name})
      } catch(e) {
        console.log(e)
        throw e
      }
    }
  }
};