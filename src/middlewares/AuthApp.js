import Customer from '../models/Customer.js'
import { errorHandler } from '../errors/ErrorHandler.js'

export const Private = async (req, res, next) => {
    let { schema } = res.locals
    let { token } = req.headers
    let customer = Customer.schema(schema)

    if(!token){
        errorHandler(res, "field-required", "token")
        return
    } else{
        const newCustomer = await customer.findOne({where: {token}, logging: false})

        if(!newCustomer){
            errorHandler(res, "field-invalid", "token")
            return;
        }else{
            next()
        }
    }
}
