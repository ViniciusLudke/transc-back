import db from '../db.js'
import {Sequelize} from 'sequelize'

export default db.define('user', {
    iduser: {
        primaryKey: true,
        type: Sequelize.BIGINT,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING(128),
        allowNull: false
    },
    email:{
        type: Sequelize.STRING(128),
        unique: true,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING(128),
        allowNull: false
    },
    active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },
    token: {
        type: Sequelize.STRING(256)
    },
    language: {
        type: Sequelize.STRING(5),
        defaultValue: 'pt-BR'
    },
    idoccupation: {
        type: Sequelize.BIGINT,
        references: {model: "occupation", key:"idoccupation"}
    },
    idprofile: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {model: "profile", key:"idprofile"}
    }
},{
    freezeTableName: true,
    timestamps: false
})