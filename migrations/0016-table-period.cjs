'use strict'

module.exports = {
  up: async function up(queryInterface, Sequelize){
    const [results] = await queryInterface.sequelize.query("SELECT schema_name FROM information_schema.schemata where schema_name like '%company%'")
    for(let i in results){
      try{
        await queryInterface.sequelize.query(`
          create table ${results[i].schema_name}.period(
          idperiod bigserial not null,
          idtravel bigint not null,
          day int not null,
          starttime time not null,
          endtime time not null,
          active bool default true,
          CONSTRAINT pk_period PRIMARY KEY (idperiod),
          constraint fk_period_travel foreign key (idtravel) references ${results[i].schema_name}.travel(idtravel)
        );
        `)
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
        await queryInterface.dropTable({tableName: 'period', schema: results[i].schema_name}, {})
      } catch(e) {
        console.log(e)
        throw e
      }
    }
  }
};
