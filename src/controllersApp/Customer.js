import Customer from '../models/Customer.js';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator'
import { errorHandler } from '../errors/ErrorHandler.js';
import sequelize from 'sequelize'; 

const Op = sequelize.Op; 

export const getCustomer = async (req, res) => {
    let { schema } = res.locals
    let customer = Customer.schema(schema)

    const find = await customer.findOne({
        attributes: ['idcustomer', 'name', 'email', 'language'],
        where: {
            token: req.headers.token
        },
        raw:true, logging: false
    }).then(result => res.json(result))
    .catch(err => res.status(400).send(err))
}

export const addCustomer = async (req, res) => {
    let { name, email, language, password, confirmpassword } = req.body
    let { schema } = res.locals

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        errorHandler(res, errors)
        return
    }

    if(!confirmpassword){
        errorHandler(res, "field-required", "password-confirmation")
        return;
    }

    if(password !== confirmpassword){
        errorHandler(res, "password-compare2")
        return;
    }

    const phash = await bcrypt.hash(password, 10);
    const payload = (Date.now() + Math.random()).toString();
    const token = await bcrypt.hash(payload, 10);

    Customer.schema(schema).create({
        name,
        email,
        password: phash,
        language,
        token: token
    },
    {
        raw:true
    })
    .then(result => res.json({idcustomer: result.dataValues.idcustomer,name: result.name, token: result.dataValues.token, language: result.dataValues.language}))
    .catch(err => errorHandler(res, err))
}

export const editCustomer = async (req, res) => {
    let { schema } = res.locals
    let { name, email, language } = req.body
    let customer = Customer.schema(schema)

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        errorHandler(res, errors)
        return
    }

    customer.update({
        name,
        email,
        language
    },{
        where: { token: req.headers.token }
    })
    .then(result => res.json(result))
    .catch(err => errorHandler(res, err))
}

export const signIn = async (req, res) => {
    let { schema } = res.locals
    let customer = Customer.schema(schema)

    if(!req.body.email){
        errorHandler(res, "field-required", "email")
        return
    } else if(!req.body.password){
        errorHandler(res, "field-required", "password")
        return
    }

    let { email, password } = req.body
    
    const newCustomer = await customer.findOne({where: { email }, logging: false})
    
    if(!newCustomer){
        errorHandler(res, "field-invalid", "email-password")
        return
    } 

    const match = await bcrypt.compare(password, newCustomer.password)
    
    if(!match){
        errorHandler(res, "field-invalid", "email-password")
        return
    } 

    const payload = (Date.now() + Math.random()).toString()
    const token = await bcrypt.hash(payload, 10);

    newCustomer.token = token;
    await newCustomer.save({logging: false});

    res.json({token, name: newCustomer.name, id: newCustomer.idcustomer, language: newCustomer.language})
}

export const verifyLoginCustomer = async (req, res) => {
    let { schema } = res.locals
    let { token } = req.headers
    let customer = Customer.schema(schema)

    customer.findOne({where: {token}, logging: false})

    .then(result => res.send(result))
    .catch(err => errorHandler(res, err))
}

export const signOut = async (req, res) => {
    let { schema } = res.locals
    let { token } = req.headers
    let customer = Customer.schema(schema)

    customer.update({
        token: ""
    },{
        where: { token },
        logging: false
    })
        
    .then(result => res.json(result))
    .catch(err => errorHandler(res, err))
}



export const changePassword = async(req,res) =>{

    let { schema } = res.locals
    const {password, newpassword, confirmpassword} = req.body;


    const errors = validationResult(req);
    if(!errors.isEmpty()){
        errorHandler(res, errors)
        return
    }

    if(password.length < 3){
        errorHandler(res, "small-3", "password")
        return;
    }

    if(newpassword.length < 3){
        errorHandler(res, "small-3", "newpassword")
        return;
    }


    if(confirmpassword.length < 3){
        errorHandler(res, "small-3", "confirmpassword")
        return;
    }

    if(newpassword !== confirmpassword){
        errorHandler(res, "password-compare")
        return;
    }


    let customer = await Customer.schema(schema).findOne({
        where:{
            token: req.headers.token
        },
        logging: false
    });

    const match = await bcrypt.compare(password, customer.password);
    const match2 = await bcrypt.compare(newpassword, customer.password); 
    
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

    customer.update({
        password: phash,
        token
    }, {logging: false})
    res.json({token});
    
}