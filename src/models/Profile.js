import db from '../db.js'
import { Sequelize } from 'sequelize'

export default db.define('profile', {
    idprofile: {
        primaryKey: true,
        type: Sequelize.BIGINT,
        autoIncrement: true
    },
    profile:{
        type: Sequelize.STRING(128),
        allowNull:false
    }
},{
    freezeTableName: true,
    timestamps: false
})