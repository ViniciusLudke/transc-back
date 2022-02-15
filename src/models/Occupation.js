import db from '../db.js'
import { Sequelize } from 'sequelize'

export default db.define('occupation', {
    idoccupation: {
        primaryKey: true,
        type: Sequelize.BIGINT,
        autoIncrement: true
    },
    occupation: {
        type: Sequelize.STRING(128),
        allowNull: false
    }
},{
    freezeTableName: true,
    timestamps: false
})