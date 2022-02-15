import db from '../db.js'
import { Sequelize } from 'sequelize'

export default db.define('typetravel', {
    idtypetravel: {
        primaryKey: true,
        type: Sequelize.BIGINT,
        autoIncrement: true
    },
    typetravel:{
        type: Sequelize.STRING(256),
        allowNull:false
    },
    active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },
},{
    freezeTableName: true,
    timestamps: false
})