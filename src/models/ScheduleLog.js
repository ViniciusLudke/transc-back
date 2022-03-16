import db from '../db.js'
import { Sequelize } from 'sequelize'

export default db.define('schedulelog', {
    idschedulelog: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    idschedule: {
        type: Sequelize.BIGINT,
        allowNull: false
    },
    iduser: {
        type: Sequelize.BIGINT,
        references: {
            model: 'user',
            key: 'iduser'
        }
    },
    idcustomer: {
        type: Sequelize.BIGINT,
        references: {
            model: 'customer',
            key: 'idcustomer'
        }
    },
    datetime:{
        type: Sequelize.DATE,
    },
    oldstatus: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    newstatus: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    reason:{
        type: Sequelize.TEXT,
    },
},{
    freezeTableName: true,
    timestamps: false
})