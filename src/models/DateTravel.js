import db from '../db.js'
import { Sequelize } from 'sequelize'

export default db.define('datetravel', {
    iddatetravel: {
        primaryKey: true,
        type: Sequelize.BIGINT,
        autoIncrement: true,
        allowNull: false
    },
    idtravel: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
            model: 'travel',
            key: 'idtravel'
        }
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
},{
    freezeTableName: true,
    timestamps: false
})