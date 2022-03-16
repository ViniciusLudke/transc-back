import {Errors} from './Errors.js'

export const errorHandler = (res, key, field = "") => {

    let errors = []
    console.log(key)
    if(key.errors){
        if(key.errors[0].validatorKey){
            for(let i in key.errors){
                const field = key.errors[i].path
                const code = key.errors[i].validatorKey
                const msg = key.errors[i].message
    
                errors.push({
                    code,
                    field,
                    msg,
                })
            }
        }else {
            for(let i in key.errors){
                const field = key.errors[i].param
                const code = key.errors[i].msg
                const msg = Errors[code].message.replace("%field", field)
    
                errors.push({
                    code,
                    field,
                    msg,
                })
            }
        }
    }
    else if(key.original){
        console.log(key)
        errors.push({
            Database: key.original
        })
    }else{
        const msg = Errors[key].message.replace("%field", field)
        const code = Errors[key].code
        
        errors.push({
            code,
            field,
            msg
        })
    }
    
    if(field !== "token" && field !== "company"){
        res.status(500).json({errors})
    }else if(field === "company"){
        res.status(500).json({errors, companyNotAllowed: true })
    }
     else {
        res.status(500).json({errors, notAllowed: true})
    }
}