import db from '../db.js'
import { Sequelize } from 'sequelize'

export default db.define('schedule', {
    idschedule: {
        primaryKey: true,
        type: Sequelize.BIGINT,
        autoIncrement: true
    },
    idactivity: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
            model: 'activity',
            key: 'idactivity'
        }
    },
    idprofessional: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
            model: 'user',
            key: 'iduser'
        }
    },
    idcustomer: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
            model: 'customer',
            key: 'idcustomer'
        }
    },
    date:{
        type: Sequelize.DATE,
        allowNull:false,
        unique: true
    },
    starttime: {
        type: Sequelize.STRING,
        allowNull: false
    },
    endtime: {
        type: Sequelize.STRING,
        allowNull: false
    },
    participant:{
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    person:{
      type:Sequelize.STRING(128),
      allowNull: false 
    },
    status:{
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
},{
    freezeTableName: true,
    timestamps: false
})