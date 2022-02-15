import { errorHandler } from '../errors/ErrorHandler.js'
import Company from '../models/Company.js'

export const Schema = async (req, res, next) => {
    if(!req.headers.company){
        errorHandler(res, "field-required", "company")
        return
    } else{
        const schema = await Company.findByPk(req.headers.company)

        if(!schema){
            errorHandler(res, "field-notfound", "company")
            return;
        }if(schema.active == false){
            errorHandler(res, "field-inactive", "company")
            return;
        }else{
            res.locals.schema = `company_${req.headers.company}`
        }
        next()
    }
}