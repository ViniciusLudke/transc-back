import Bus from '../models/Bus.js';
import { validationResult } from 'express-validator'
import { errorHandler } from '../errors/ErrorHandler.js';

export const getBus = async (req, res) => {
    let { schema } = res.locals
    let bs = Bus.schema(schema)

    bs.findAll({
        raw: true,
        attributes: ['idbus', 'bus', 'active', 'simultaneous'],
        order: [['idbus', 'DESC']],
    })
    .then(result => res.json(result))
    .catch(err => res.status(400).send(err))
}


export const getOneBus = async (req, res) => {
    let { schema } = res.locals
    let { id } = req.params
    let bs = Bus.schema(schema)

    const find = await bs.findByPk(id, {
        attributes: ['idbus', 'bus', 'active', 'simultaneous']
    }).then(result => {
        result ? res.json(result) : errorHandler(res, "record-not-found", "bus")})
    .catch(err => res.status(400).send(err))
}

export const addBus = async (req, res) => {
    let { bus, simultaneous} = req.body
    let { schema } = res.locals

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        errorHandler(res, errors)
        return
    }

    Bus.schema(schema).create({
        bus,
        simultaneous
    })
    .then(result => res.status(200).json(result.idbus))
    .catch(err => res.status(400).send(err))
}

export const editBus = async (req, res) => {
    let { schema } = res.locals
    let { id } = req.params
    let { bus, active, simultaneous } = req.body
    let bs = Bus.schema(schema)

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        errorHandler(res, errors)
        return
    }

    bs.update({
        bus,
        active,
        simultaneous
    },{
        where: { idbus: id }
    })
    .then(result => res.json(result))
    .catch(err => res.status(400).send(err))
}


export const deleteBus = async (req, res) => {
    let { schema } = res.locals
    let { id } = req.params
    let bs = Bus.schema(schema)

    bs.destroy({
        where: { idbus: id }
    })
    .then(result => res.json(result))
    .catch(err => res.status(400).send(err))
}