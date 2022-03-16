import db from '../db.js'
import { Sequelize } from 'sequelize'

export default db.define('customer', {
    idcustomer: {
        primaryKey: true,
        type: Sequelize.BIGINT,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING(128),
        allowNull: false
    },
    email: {
        type: Sequelize.STRING(128),
        unique: true,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING(128),
        allowNull: false
    },
    language: {
        type: Sequelize.STRING(5),
        defaultValue: 'pt-BR'
    },
    token: {
        type: Sequelize.STRING(256)
    }
},{
    freezeTableName: true,
    timestamps: false
})