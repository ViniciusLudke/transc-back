import DateTravel from '../models/DateTravel.js';
import Travel from '../models/Travel.js'
import { verifyDate, verifyValidators } from '../business/verify.js'
//import { validationResult } from 'express-validator'
import { errorHandler } from '../errors/ErrorHandler.js';
//import imgHandler from '../business/imgHandler.js'

export const getDateTravel = async (req, res) => {
    let { schema } = res.locals
    let Dt = DateTravel.schema(schema)
    Dt.findAll({
        raw: true, logging: false,
        order: [['iddatetravel', 'DESC']],
    })
    .then(result => res.json(result))
    .catch(err => errorHandler(res, err))
}

export const getDateTravelId = async (req, res) => {
    let { schema } = res.locals
    let {id} = req.params

    let Dt = DateTravel.schema(schema)
    let Tr = Travel.schema(schema)

    Dt.findAll({
        raw: true,logging:false,
        where:{ idtravel: id}
    })
    .then(result => res.json(result))
    .catch(err => errorHandler(res, err))
}

export const getOneDateTravel = async (req, res) => {
    let { schema } = res.locals
    let { id } = req.params
    let Dt = DateTravel.schema(schema)
    Dt.findByPk(id, {logging: false}).then(result => {
            res.json(result)

            //errorHandler(res, "record-not-found", "travel")
       
    })
    .catch(err => errorHandler(res, err))
}



export const addDateTravel = async (req, res) => {
    
    verifyValidators(req, res)
    console.log(req.body)
    let { startdate, starttime, endtime, idtravel} = req.body

    let { schema } = res.locals
    let Dt = DateTravel.schema(schema)

    Dt.create({
        startdate, starttime, endtime, idtravel
    },{logging: false})
    .then(result => res.status(200).json(result.iddatetravel))
    .catch(err => errorHandler(res, err))
}


export const editDateTravel = async (req, res) => {

    verifyValidators(req, res)
    let {id} = req.params
    let { startdate, starttime, endtime } = req.body

    let { schema } = res.locals
    let Dt = DateTravel.schema(schema)

    Dt.update({
        startdate, starttime, endtime
    },{
        where: { iddatetravel: id },
        logging: true,
    })
    .then(result => res.json(result[0]))
    .catch(err => errorHandler(res, err))
}

export const deleteDateTravel = async (req, res) => {
    let { schema } = res.locals
    let { id } = req.params
    let Dt = DateTravel.schema(schema)

    Dt.destroy({
        where: { iddatetravel: id },
        logging: false,
    })
    .then(result => res.json(result))
    .catch(err => errorHandler(res, err))
}