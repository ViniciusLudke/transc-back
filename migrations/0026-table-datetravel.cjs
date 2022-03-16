

'use strict'

module.exports = {
  up: async function up(queryInterface, Sequelize){
    const [results] = await queryInterface.sequelize.query("SELECT schema_name FROM information_schema.schemata where schema_name like '%company%'")
    for(let i in results){
      return queryInterface.sequelize.query(`create table ${results[i].schema_name}.datetravel (
        iddatetravel bigserial not null,
        idtravel bigint not null, 
        startdate date not null,
        starttime time not null,
        endtime time not null,
        CONSTRAINT pk_datetravel PRIMARY KEY (iddatetravel),
        constraint fk_datetravel_travel foreign key (idtravel) references ${results[i].schema_name}.travel(idtravel)
      );`)
    }
  },

  down: async function down(queryInterface, Sequelize){
    const [results] = await queryInterface.sequelize.query("SELECT schema_name FROM information_schema.schemata where schema_name like '%company%'")
    for(let i in results){
      return queryInterface.dropTable({tableName: 'user', schema: results[i].schema_name})
    }
  }
};
