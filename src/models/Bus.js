import db from '../db.js'
import { Sequelize } from 'sequelize'

export default db.define('bus', {
    idbus: {
        primaryKey: true,
        type: Sequelize.BIGINT,
        autoIncrement: true
    },
    bus: {
        type: Sequelize.STRING(128),
        allowNull: false
    },
    simultaneous: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },
},{
    freezeTableName: true,
    timestamps: false
})