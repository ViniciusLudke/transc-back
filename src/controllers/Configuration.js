import Configuration from '../models/Configuration.js';
import { errorHandler } from '../errors/ErrorHandler.js';
//import { validationResult } from 'express-validator'
//import imgHandler from '../business/imgHandler.js';

export const getConfigs = async (req, res) => {
    let { schema } = res.locals
    let { id } = req.params
    let Config = Configuration.schema(schema)

    Config.findByPk(id, {logging: false})
    .then(result =>  {
        if(result){
            if(result.photo){
                const projectImage = result.photo.toString('base64');
                result['photo'] = projectImage;
            }
            res.json(result)
        }else errorHandler(res, "record-not-found", "config")
    })
    .catch(err => res.status(400).send(err))
}

export const addConfig = async (req, res) => {
    let { idcompany, name, barcolor, primarycolor, secondarycolor } = req.body
    let { schema } = res.locals
    let photo = '', mimetype = ''
    let Config = Configuration.schema(schema)

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        errorHandler(res, errors)
        return
    }

    if(req.files){
        //let { newBuffer, mime } = await imgHandler(req.files, 500, 400)
        photo = newBuffer
        mimetype = mime
    }

    Config.schema(schema).create({
        idcompany,
        company: name,
        photo,
        mimetype,
        barcolor, 
        primarycolor, 
        secondarycolor
    }, {logging: false})
    .then(result => res.json({status: true}))
    .catch(err => errorHandler(res, err))
}

export const editConfig = async (req, res) => {
    let { name, deleteImage, barcolor, primarycolor, secondarycolor } = req.body
    let { schema } = res.locals
    let { id } = req.params
    let photo, mimetype
    let Config = Configuration.schema(schema)
    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        errorHandler(res, errors)
        return
    }

    if(deleteImage === true || deleteImage === 'true'){
        photo = ''
        mimetype = ''
    }else if(req.files){
        let { newBuffer, mime } = await imgHandler(req.files, 500, 400)
        photo = newBuffer
        mimetype = mime
    }

    Config.update({
        company: name, photo, mimetype, barcolor, primarycolor, secondarycolor
    },{
        where: { idcompany: id },
        logging: false
    })
    .then(result => res.json(result))
    .catch(err => errorHandler(res, err))
}