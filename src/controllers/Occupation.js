import Occupation from '../models/Occupation.js';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator'
import { errorHandler } from '../errors/ErrorHandler.js';

export const getOccupations = async (req, res) => {
    let { schema } = res.locals
    let Oc = Occupation.schema(schema)

    Oc.findAll({
        raw: true,
        attributes: ['idoccupation', 'occupation'],
        order: [['idoccupation', 'DESC']],
    })
    .then(result => res.json(result))
    .catch(err => errorHandler(res, err))
}

export const getOccupation = async (req, res) => {
    let { schema } = res.locals
    let { id } = req.params
    let Oc = Occupation.schema(schema)

    Oc.findByPk(id, {
        attributes: ['idoccupation', 'occupation'],
    }).then(result => {
        result ? res.json(result) : errorHandler(res, "record-not-found", "occupation")})
    .catch(err => errorHandler(res, err))
}

export const addOccupation = async (req, res) => {
    let { occupation } = req.body
    let { schema } = res.locals

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        errorHandler(res, errors)
        return
    }

    Occupation.schema(schema).create({
        occupation,
    })
    .then(result => res.json(result.idoccupation))
    .catch(err => errorHandler(res, err))
}

export const editOccupation = async (req, res) => {
    let { schema } = res.locals
    let { id } = req.params
    let { occupation } = req.body
    let Oc = Occupation.schema(schema)

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        errorHandler(res, errors)
        return
    }

    Oc.update({
        occupation
    },{
        where: { idoccupation: id }
    })
    .then(result => res.json(result))
    .catch(err => errorHandler(res, err))
}

export const deleteOccupation = async (req, res) => {
    let { schema } = res.locals
    let { id } = req.params
    let Oc = Occupation.schema(schema)

    Oc.destroy({
        where: { idoccupation: id }
    })
    .then(result => res.json(result))
    .catch(err => errorHandler(res, err))
}
