'use strict';

module.exports = {
  up: async function up(queryInterface, Sequelize){
    const migration = async (queryInterface) => {
      const [results] = await queryInterface.sequelize.query("SELECT schema_name FROM information_schema.schemata where schema_name like '%company%'")
      for(let i in results){
        return Promise.all([
          queryInterface.sequelize.query(`alter table ${results[i].schema_name}.user add column idoccupation bigint`),
          queryInterface.sequelize.query(`alter table ${results[i].schema_name}.user add constraint fk_user_occupation foreign key (idoccupation) references ${results[i].schema_name}.occupation(idoccupation)`)
        ])
      }
    }
    setTimeout(migration, 100, queryInterface)
  },

  down: async function down(queryInterface, Sequelize){
    const [results] = await queryInterface.sequelize.query("SELECT schema_name FROM information_schema.schemata where schema_name like '%company%'")
    for(let i in results){
      return queryInterface.removeColumn({tableName: 'user', schema: results[i].schema_name}, 'idoccupation', {});
    }
  }
};
