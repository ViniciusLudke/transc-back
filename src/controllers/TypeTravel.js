import TypeTravel from '../models/TypeTravel.js';
import { validationResult } from 'express-validator'
import { errorHandler } from '../errors/ErrorHandler.js';



export const getTypeTravel = async (req, res) => {
    let { schema } = res.locals
    let typeTravel = TypeTravel.schema(schema)
    typeTravel.findAll({
        raw: true,
        attributes: ['idtypetravel', 'typetravel', 'active'],
        order: [['idtypetravel', 'DESC']],
    })
    .then(result => res.json(result))
    .catch(err => res.status(400).send(err))
}


export const getOneTypeActivity = async (req, res) => {
    let { schema } = res.locals
    let { id } = req.params
    let typeTravel = TypeTravel.schema(schema)

    const find = await typeTravel.findByPk(id, {
        attributes: ['idtypetravel', 'typetravel', 'active']
    }).then(result => {
        result ? res.json(result) : errorHandler(res, "record-not-found", "typetravel")})
    .catch(err => res.status(400).send(err))
}

export const addTypeTravel = async (req, res) => {
    let { typetravel } = req.body
    let { schema } = res.locals

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        errorHandler(res, errors)
        return
    }

    TypeTravel.schema(schema).create({
        typetravel
    })
    .then(res.send({status: true}))
    .catch(err => res.status(400).send(err))
}

export const editTypeTravel = async (req, res) => {
    let { schema } = res.locals
    let { id } = req.params
    let { typetravel, active } = req.body
    let typeTravel = TypeTravel.schema(schema)

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        errorHandler(res, errors)
        return
    }

    typeTravel.update({
        typetravel,
        active
    },{
        where: { idtypetravel: id }
    })
    .then(result => res.json(result))
    .catch(err => res.status(400).send(err))
}


export const deleteTypeTravel = async (req, res) => {
    let { schema } = res.locals
    let { id } = req.params
    let typeTravel = TypeTravel.schema(schema)

    typeTravel.destroy({
        where: { idtypetravel: id }
    })
    .then(result => res.json(result))
    .catch(err => res.status(400).send(err))
}