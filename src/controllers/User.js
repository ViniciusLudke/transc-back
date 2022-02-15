import User from '../models/User.js';
import bcrypt from 'bcrypt';
import Professional from '../models/Professional.js';
import Occupation from '../models/Occupation.js';
import Bus from '../models/Bus.js';
import Profile from '../models/Profile.js';
import { validationResult } from 'express-validator'
import { errorHandler } from '../errors/ErrorHandler.js';
import sequelize from 'sequelize'; 

const Op = sequelize.Op; 

Occupation.hasMany(User, {foreignKey: 'idoccupation'});
User.belongsTo(Occupation, {foreignKey: 'idoccupation'}); 

Profile.hasMany(User, {foreignKey: 'idprofile'});
User.belongsTo(Profile, {foreignKey: 'idprofile'});

User.hasMany(Professional, {foreignKey: 'iduser'});
Professional.belongsTo(User, {foreignKey: 'iduser'}); 


export const getUsers = async (req, res) => {
    let { schema } = res.locals
    let users = User.schema(schema)

    users.findAll({
        raw: true,
        attributes: ['iduser', 'name', 'email', 'active'],
        order: [['iduser', 'DESC']]
    })
    .then(result => res.json(result))
    .catch(err => res.status(400).send(err))
}


export const getUser = async (req, res) => {
    let { schema } = res.locals
    let { id } = req.params
    let user = User.schema(schema)
    let occupations = Occupation.schema(schema)
    let profiles = Profile.schema(schema)
    
    user.findByPk(id, {
        attributes: ['iduser', 'name', 'email', 'active', 'language'],
        raw:true,
        logging: false,
        include: [{
            model:  profiles,
            attributes: ['idprofile']
        },
        {
            model: occupations,
            attributes: ['idoccupation']
        }
    ]
    }).then(result => {
        result ? res.json(result) : errorHandler(res, "record-not-found", "user")})
    .catch(err => res.status(400).send(err))
}


export const addUser = async (req, res) => {
    let { name, email, language, idprofile, idoccupation} = req.body
    let { schema } = res.locals
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        errorHandler(res, errors)
        return
    }

    const phash = await bcrypt.hash('mudar123', 10);
    User.schema(schema).create({
        name,
        email,
        password: phash,
        language,
        idprofile,
        idoccupation
    })
    .then(result => res.json(result.iduser))
    .catch(err => errorHandler(res, err))
}

export const editUser = async (req, res) => {
    let { schema } = res.locals
    let { id } = req.params
    let { name, email, active, language, idprofile, idoccupation } = req.body
    let user = User.schema(schema)

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        errorHandler(res, errors)
        return
    }

    user.update({
        name,
        email,
        active,
        language,
        idprofile,
        idoccupation
    },{
        where: { iduser: id }
    })
    .then(result => res.json(result))
    .catch(err => res.json(err))
}

export const deleteUser = async (req, res) => {
    let { schema } = res.locals
    let { id } = req.params
    let user = User.schema(schema)

    user.destroy({
        where: { iduser: id }
    })
    .then(result => res.json(result))
    .catch(err => res.status(400).send(err))
}
export const signIn = async (req, res) => {
    let { schema } = res.locals
    let user = User.schema(schema)

    if(!req.body.email){
        errorHandler(res, "field-required", "email")
        return
    } else if(!req.body.password){
        errorHandler(res, "field-required", "password")
        return
    }

    let { email, password } = req.body
    
    const newUser = await user.findOne({where: { email }})
    
    if(!newUser){
        errorHandler(res, "field-invalid", "email-password")
        return
    } 

    const match = await bcrypt.compare(password, newUser.password)
    
    if(!match){
        errorHandler(res, "field-invalid", "email-password")
        return
    } else if(newUser.active == false){
        errorHandler(res, "field-inactive", "user")
        return
    }

    const payload = (Date.now() + Math.random()).toString()
    const token = await bcrypt.hash(payload, 10);

    newUser.token = token;
    await newUser.save();

    res.json({token, name: newUser.name, language: newUser.language})
}


export const signOut = async (req, res) => {
    let { schema } = res.locals
    let { token } = req.headers
    let user = User.schema(schema)

    user.update({
        token: null
    },{
        where: { token }
    })
        
    .then(result => res.json(result))
    .catch(err => res.status(400).send(err))
}


export const changePassword = async(req,res) =>{
    let { schema } = res.locals
    const {password, newpassword, confirmpassword} = req.body;

    if(!password){
        errorHandler(res, "field-required", "password")
        return;
    }
    if(!newpassword){
        errorHandler(res, "field-required", "new-password")
        return;
    }
    if(!confirmpassword){
        errorHandler(res, "field-required", "password-confirmation")
        return;
    }


    if(newpassword !== confirmpassword){
        errorHandler(res, "password-compare")
        return;
    }


    let user = await User.schema(schema).findOne({
        where:{
            token: req.headers.token
        }
    });

    const match = await bcrypt.compare(password, user.password);
    const match2 = await bcrypt.compare(newpassword, user.password); 
    
    if(!match){
        errorHandler(res, "curent-password-invalid")
        return;
    }

    if(match2){
        errorHandler(res, "curent-password-match")
        return;
    }

    const payload = (Date.now() + Math.random()).toString()
    const token = await bcrypt.hash(payload, 10);
    const phash = await bcrypt.hash(newpassword, 10);

    user.update({
    password: phash,
    token
    })
    res.json({token});
    
}


export const verifyLogin = async (req, res) => {
    let { schema } = res.locals
    let { token } = req.headers
    let user = User.schema(schema)

    user.findOne({where: {token}})

    .then(result => res.send(result))
    .catch(err => errorHandler(res, err))
}


export const getUsersActive = async (req, res) => {
    let { schema } = res.locals
    let user = User.schema(schema)
    let professional = Professional.schema(schema)
    let bus = Bus.schema(schema) 

    let idsUser = []
    let idsBus = []
    let idtravel = req.params.id
    
    let resp = await professional.findAll({where:{idtravel}, logging: false, raw:true})
    let t = resp.length
    for (let i = 0 ; i < t; i++){
        idsUser[i] = resp[i].iduser,
        idsBus[i] = resp[i].idbus
    }

    let u = await user.findAll({
        raw: true, logging: false,
        attributes: ['iduser', 'name'],
        where:{
            active: true,
            iduser:{[Op.notIn]: idsUser}
        }
    })

    let b = await bus.findAll({
        raw: true, logging: false,
        attributes: ['idbus', 'bus', 'simultaneous'],
        where:{
            active: true,
            idbus:{[Op.notIn]: idsBus}
        }
    })

    res.json({user: u, bus : b})

}