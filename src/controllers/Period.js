import Period from '../models/Period.js'
import { validationResult } from 'express-validator'
import { errorHandler } from '../errors/ErrorHandler.js';

export const getPeriods = async (req, res) => {
    let { id } = req.params
    let { schema } = res.locals
    let Pe = Period.schema(schema)

    Pe.findAll({
        attributes: {exclude: ['idtravel']},
        order: [['day', 'ASC']],
        where: {idtravel: id, active: true},
        logging: false
    })
    .then(result => res.json(result))
    .catch(err => errorHandler(res, err))
}

export const getPeriod = async (req, res) => {
    let { schema } = res.locals
    let { id } = req.params
    let Pe = Period.schema(schema)

    Pe.findOne({where:{idperiod: id, active: true},attributes: {exclude: ['idactivity']},logging: false})
    .then(result => res.json(result))
    .catch(err => errorHandler(res, err))
}

export const addPeriod = async (req, res) => {
    let { idtravel, day, starttime, endtime } = req.body
    let { schema } = res.locals

    let Pe = Period.schema(schema) 
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        errorHandler(res, errors)
        return
    }
    Pe.create({
        idtravel, day, starttime, endtime
    }, {logging: false})
    .then(result => res.status(200).json(result.idperiod))
    .catch(err => errorHandler(res, err))
}

export const editPeriod = async (req, res) => {
    let { schema } = res.locals
    let { id } = req.params
    let { day, starttime, endtime } = req.body
    let Pe = Period.schema(schema) 

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        errorHandler(res, errors)
        return
    }

    Pe.update({
        day, starttime, endtime
    },{
        where: { idperiod: id },
        logging: false
    })
    .then(result => res.json(result))
    .catch(err => errorHandler(res, err))
}

export const deletePeriod = async (req, res) => {
    let { schema } = res.locals
    let { id } = req.params
    let Pe = Period.schema(schema) 

    Pe.destroy({where: { idperiod: id },logging: false})
    .then(result => res.json(result))
    .catch(err => {
        Pe.update({ active: false},{
            where: { idperiod: id },logging: false
        })
        .then(result => res.json(result))
        .catch(err => errorHandler(res, err))
    } )
}
