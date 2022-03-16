import moment from 'moment'
import { errorHandler } from '../errors/ErrorHandler.js';
import { validationResult } from 'express-validator'

export const verifyDate =  (res, startdate, starttime, endtime, days) => {

    let verifyDate = moment(`${startdate}`)

    if(verifyDate.isValid() == false){
        errorHandler(res, "field-invalid", "date")
        return true
    }

    if(days === 0 && starttime > endtime){
        errorHandler(res, "field-invalid", "hours")
        return true
    }

}

export const verifyValidators =  (req, res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        errorHandler(res, errors)
        return
    }
}