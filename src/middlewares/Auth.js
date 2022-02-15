import User from '../models/User.js'
import { errorHandler } from '../errors/ErrorHandler.js'

export const Private = async (req, res, next) => {
    let { schema } = res.locals
    let { token } = req.headers
    let user = User.schema(schema)

    if(!token){
        errorHandler(res, "field-required", "token")
        return
    } else{
        const newUser = await user.findOne({where: {token}})

        if(!newUser){
            errorHandler(res, "field-invalid", "token")
            return;
        }if(newUser.active == false){
            errorHandler(res, "field-inactive", "user")
            return;
        }else{
            next()
        }
    }
}