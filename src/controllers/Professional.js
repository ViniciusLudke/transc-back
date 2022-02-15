import Professional from '../models/Professional.js';
import Travel from '../models/Travel.js';
import Occupation from '../models/Occupation.js';
import Bus from '../models/Bus.js'
import { validationResult } from 'express-validator'
import { errorHandler } from '../errors/ErrorHandler.js';
import User from '../models/User.js'
import sequelize from 'sequelize'

const Op = sequelize.Op

Travel.hasMany(Professional, {foreignKey: 'idtravel'});
Professional.belongsTo(Travel, {foreignKey: 'idtravel'}); 

User.hasMany(Professional, {foreignKey: 'iduser'});
Professional.belongsTo(User, {foreignKey: 'iduser'}); 

Professional.hasMany(User, {foreignKey: 'iduser'});
User.belongsTo(Professional, {foreignKey: 'iduser'}); 

Bus.hasMany(Professional, {foreignKey: 'idbus'});
Professional.belongsTo(Bus, {foreignKey: 'idbus'}); 


export const getProfessionalsTravel = async (req, res) => {
    let { schema } = res.locals
    let Prof = Professional.schema(schema)
    let Us = User.schema(schema)
    let Bs = Bus.schema(schema)
    let Ocp = Occupation.schema(schema)

    let {id} = req.params
    let i
    Prof.findAll({
        raw: true, logging: false,
        order: [['idprofessional', 'DESC']],
            where:{
                idtravel: id,
            },
        include:[{
            model:Us,
            attributes:['name', 'active'],
            include:{
                model: Ocp,
                attributes:['occupation']
            }
        },{
            model:Bs,
            attributes:['bus','simultaneous']
        }]
    })
    .then(result => res.json(result))
    .catch(err => errorHandler(res, err))
}

export const getProfessional = async (req, res) => {
    let { schema } = res.locals
    let { id } = req.params
    let Prof = Professional.schema(schema)
    let Bs = Bus.schema(schema)

    Prof.findOne({
        raw: true, logging: false,
        where:{
            idprofessional : id
        },
        include:[{
            model:User.schema(schema),
            attributes:['name'],
            where:{
                active: true
            },  
        },{
            model:Bs,
            attributes:['bus']
        }],
    }).then(result => result ? res.json(result) : errorHandler(res, "record-not-found", "professional"))
    .catch(err => errorHandler(res, err))
}

export const addProfessional = async (req, res) => {
    let { travel, bus,  user } = req.body
    let { schema } = res.locals
    let match = false
    let Prof = Professional.schema(schema) 
    let Tr = Travel.schema(schema)
    let Bs = Bus.schema(schema)
    let Us = User.schema(schema)

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        errorHandler(res, errors)
        return
    }

    await Tr.findOne({
        where:{
            idtravel : travel
        },
        logging: false
    }).then(result => result ? 
        
        Us.findOne({
            where:{
                iduser : user,
                active: true
            },
            logging: false
        }).then(result => result ?       
            
            Bs.findOne({
                where:{
                    idbus : bus
                },
                logging: false
            }).then(result => result ? match = true : errorHandler(res, "record-not-insert", "professional"))
            .catch(err => errorHandler(res, err))
            
            : errorHandler(res, "record-not-insert", "professional"))
        .catch(err => errorHandler(res, err))        
        
        : errorHandler(res, "record-not-insert", "professional"))
    .catch(err => errorHandler(res, err))
    

    if(match){
        await Prof.findOne({
            where:{
                idtravel : travel,
                [Op.or]: [
                    { iduser: user },
                    { idbus: bus }
                  ]
            },
            logging: false
        }).then(result => 
            result ? errorHandler(res, "record-not-insert", "professional")
            :
            Prof.create({
                idtravel : travel, iduser : user, idbus: bus
            },{logging: false})
            .then(result => res.status(200).json(result))
            .catch(err => errorHandler(res, err))

        ).catch(err => errorHandler(res, err))
    }
}

export const deleteProfessional = async (req, res) => {
    let { schema } = res.locals
    let { id } = req.params
    let Prof = Professional.schema(schema)

    Prof.destroy({
        where: { idprofessional: id },
        logging: false
    })
    .then(result => res.json(result))
    .catch(err => errorHandler(res, err))
}


export const getAllProfessionals = async (req, res) => {
    let { schema } = res.locals
    let professional = Professional.schema(schema)
    let user = User.schema(schema)

    await user.findAll({
        logging: false,
        raw: true,
        group: 'user.iduser',
        attributes:['iduser', 'name'],
        where:{
            active: true
        },
        include:{
            model:professional,
            raw: true,
            attributes:[],
            where:{
                idprofessional:{[Op.ne]: null,}
            },
        }
    })
    .then(result => res.json(result))
    .catch(err => errorHandler(res, err))
}

