import db from '../db.js'
import { Sequelize } from 'sequelize'

export default db.define('company', {
    idcompany: {
        primaryKey: true,
        type: Sequelize.BIGINT,
        autoIncrement: true,
    },
    company:{
        type: Sequelize.STRING(64),
        allowNull:false
    },
    corporatename: {
        type: Sequelize.STRING(256),
        allowNull: false
    },
    active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },
},{
    freezeTableName: true,
    timestamps: false
})