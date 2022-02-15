import Profile from '../models/Profile.js';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator'
import { errorHandler } from '../errors/ErrorHandler.js';

export const getProfiles = async (req, res) => {
    let { schema } = res.locals
    let profiles = Profile.schema(schema)
    profiles.findAll({
        raw: true,
        attributes: ['idprofile', 'profile'],
        order: [['idprofile', 'DESC']],
    })
    .then(result => res.json(result))
    .catch(err => res.status(400).send(err))
}

export const getProfile = async (req, res) => {
    let { schema } = res.locals
    let { id } = req.params
    let profile = Profile.schema(schema)

    const find = await profile.findByPk(id, {
        attributes: ['idprofile', 'profile']
    }).then(result => {
        result ? res.json(result) : errorHandler(res, "record-not-found", "profile")})
    .catch(err => res.status(400).send(err))
}

export const addProfile = async (req, res) => {
    let { profile } = req.body
    let { schema } = res.locals

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        errorHandler(res, errors)
        return
    }

    Profile.schema(schema).create({
        profile
    })
    .then(result => res.send({status: true}))
    .catch(err => res.status(400).send(err))
}

export const editProfile = async (req, res) => {
    let { schema } = res.locals
    let { id } = req.params
    let { profile } = req.body
    let p = Profile.schema(schema)

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        errorHandler(res, errors)
        return
    }

    p.update({
        profile
    },{
        where: { idprofile: id }
    })
    .then(result => res.json(result))
    .catch(err => res.status(400).send(err))
}

export const deleteProfile = async (req, res) => {
    let { schema } = res.locals
    let { id } = req.params
    let p = Profile.schema(schema)

    p.destroy({
        where: { idprofile: id }
    })
    .then(result => res.json(result))
    .catch(err => res.status(400).send(err))
}