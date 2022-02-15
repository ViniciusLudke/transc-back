import db from '../db.js'
import { Sequelize } from 'sequelize'

export default db.define('travel', {
    idtravel: {
        primaryKey: true,
        type: Sequelize.BIGINT,
        autoIncrement: true,
        allowNull: false
    },
    travel: {
        type: Sequelize.STRING(128),
        allowNull: false
    },
    active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    usually: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    days: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    startdate:{
        type: Sequelize.DATE,
        allowNull:true
    },
    starttime:{
        type: Sequelize.STRING,
        allowNull: true
    },
    endtime:{
        type: Sequelize.STRING,
        allowNull: true
    },
    idtypetravel: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
            model: 'typetravel',
            key: 'idtypetravel'
        }
    }
},{
    freezeTableName: true,
    timestamps: false
})