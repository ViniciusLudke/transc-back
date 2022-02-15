import db from '../db.js'
import { Sequelize } from 'sequelize'

export default db.define('period', {
    idperiod: {
        primaryKey: true,
        type: Sequelize.BIGINT,
        autoIncrement: true
    },
    idtravel:{
        type: Sequelize.BIGINT,
        allowNull:false,
        references: {
            model: 'travel',
            key: 'idtravel'
        }
    },
    active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },
    day: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    starttime: {
        type: Sequelize.STRING,
        allowNull: false
    },
    endtime: {
        type: Sequelize.STRING,
        allowNull: false
    },
},{
    freezeTableName: true,
    timestamps: false
})