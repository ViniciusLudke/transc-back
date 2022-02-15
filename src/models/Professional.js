import db from '../db.js'
import { Sequelize } from 'sequelize'

export default db.define('professional', {
    idprofessional: {
        primaryKey: true,
        type: Sequelize.BIGINT,
        autoIncrement: true
    },
    iduser: {
        type: Sequelize.BIGINT,
        allowNull: false
    },
    idtravel: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
            model: 'travel',
            key: 'idtravel'
        }
    }
},{
    freezeTableName: true,
    timestamps: false
})