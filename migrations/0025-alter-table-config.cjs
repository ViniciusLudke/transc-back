'use strict';

module.exports = {
  up: async function up(queryInterface, Sequelize){
    const [results] = await queryInterface.sequelize.query("SELECT schema_name FROM information_schema.schemata where schema_name like '%company%'")
    for(let i in results){
      try{
          await queryInterface.sequelize.query(`ALTER TABLE ${results[i].schema_name}."configuration" ADD barcolor varchar(8) NOT NULL DEFAULT '#3d4977';`)
          await queryInterface.sequelize.query(`ALTER TABLE ${results[i].schema_name}."configuration" ADD primarycolor varchar(8) NOT NULL DEFAULT '#3d4977';`)
          await queryInterface.sequelize.query(`ALTER TABLE ${results[i].schema_name}."configuration" ADD secondarycolor varchar(8) NOT NULL DEFAULT '#5383ff';`)
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
        await queryInterface.sequelize.query(`ALTER TABLE ${results[i].schema_name}."configuration" DROP COLUMN barcolor;`)
        await queryInterface.sequelize.query(`ALTER TABLE ${results[i].schema_name}."configuration" DROP COLUMN primarycolor;`)
        await queryInterface.sequelize.query(`ALTER TABLE ${results[i].schema_name}."configuration" DROP COLUMN secondarycolor;`)
      } catch(e) {
          console.log(e)
          throw e
        }
    }
  }
};
