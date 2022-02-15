import Travel from '../models/Travel.js';
import TypeTravel from '../models/TypeTravel.js';
import { verifyDate, verifyValidators } from '../business/verify.js'

//import Period from '../models/Period.js'
//import { validationResult } from 'express-validator'
import { errorHandler } from '../errors/ErrorHandler.js';
//import imgHandler from '../business/imgHandler.js'


TypeTravel.hasMany(Travel, {foreignKey: 'idtypetravel'})
Travel.belongsTo(TypeTravel, {foreignKey: 'idtypetravel'})
/*
Activity.hasMany(Period, {foreignKey: 'idactivity'})
Period.belongsTo(Activity, {foreignKey: 'idactivity'})*/

export const getTravel = async (req, res) => {
    let { schema } = res.locals
    let Tr = Travel.schema(schema)
    let TT = TypeTravel.schema(schema)
    Tr.findAll({
        raw: true, logging: true,
        order: [['idtravel', 'DESC']],
        include:[{
            model:TT,
            attributes:['typetravel']
        }]
    })
    .then(array => {
        array.map(a => {
            if(a.photo){
                const projectImage = a.photo.toString('base64')
                a['photo'] = projectImage
            }
        });
        return array;
    })
    .then(result => res.json(result))
    .catch(err => errorHandler(res, err))
}

export const getOneTravel = async (req, res) => {
    let { schema } = res.locals
    let { id } = req.params
    let Tr = Travel.schema(schema)
    let TT = TypeTravel.schema(schema)

    Tr.findByPk(id, {logging: false,
        include:[{
            model:TT,
            attributes:['typetravel']
        }]
    }).then(result => {
        if(result){
        if(result.photo){
            const projectImage = result.photo.toString('base64');
            result['photo'] = projectImage;
        }
            res.json(result)
        }else{
            errorHandler(res, "record-not-found", "travel")
        }
    })
    .catch(err => errorHandler(res, err))
}



export const addTravel = async (req, res) => {
    
    verifyValidators(req, res)

    let { travel, active, description, usually, days, idtypetravel,starttime, endtime, startdate} = req.body
    const resp = verifyDate(res, startdate, starttime, endtime, days)

    let { schema } = res.locals
    let Tr = Travel.schema(schema)

    Tr.create({
        travel, active, description, usually, days, idtypetravel, startdate,  starttime, endtime
    },{logging: false})
    .then(result => res.status(200).json(result.idtravel))
    .catch(err => errorHandler(res, err))
}


export const editActivity = async (req, res) => {

    verifyValidators(req, res)

    let {id} = req.params
    let { travel, active, description, usually, days, idtypetravel, startdate,  starttime, endtime } = req.body
    
    verifyDate(res, startdate, starttime, endtime, days)

    let { schema } = res.locals
    let Tr = Travel.schema(schema)
    
    Tr.update({
        travel, active, description, usually, days, idtypetravel, startdate,  starttime, endtime
    },{
        where: { idtravel: id },
        logging: false,
    })
    .then(result => res.json(result[0]))
    .catch(err => errorHandler(res, err))
}

export const deleteTravel = async (req, res) => {
    let { schema } = res.locals
    let { id } = req.params
    let Tr = Travel.schema(schema)

    Tr.destroy({
        where: { idtravel: id },
        logging: false,
    })
    .then(result => res.json(result))
    .catch(err => errorHandler(res, err))
}

/*
export const getActivitiesActive = async (req, res) => {
    let { schema } = res.locals
    let Ac = Activity.schema(schema)
    let TypeAct = TypeActivity.schema(schema)

    Ac.findAll({
        raw: true, logging: false,
        attributes:['idactivity', 'activity'],
        order: [['idactivity', 'DESC']],
        where:{
            active: true
        },
        include:{
            model: TypeAct,
            attributes:[],
            where:{
                active: true
            }
        }
    })
    .then(result => res.json(result))
    .catch(err => errorHandler(res, err))
}*/