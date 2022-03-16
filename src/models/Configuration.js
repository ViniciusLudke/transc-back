import db from '../db.js'
import { Sequelize } from 'sequelize'

export default db.define('configuration', {
    idcompany: {
        primaryKey: true,
        type: Sequelize.BIGINT,
    },
    company: {
        type: Sequelize.STRING(64),
        allowNull: false
    },
    photo: {
        type: Sequelize.BLOB,
    },
    mimetype: {
        type: Sequelize.TEXT
    },
    barcolor: {
        type: Sequelize.TEXT
    },
    primarycolor: {
        type: Sequelize.TEXT
    },
    secondarycolor: {
        type: Sequelize.TEXT
    } 
},{
    freezeTableName: true,
    timestamps: false
})