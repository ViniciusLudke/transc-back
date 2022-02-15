import { checkSchema } from 'express-validator';

export const Validators = checkSchema({
    
    travel: {
        optional: false,
        isLength: {
            options: {min: 1}
        },
        errorMessage: 'field-required'
    },
    user: {
        optional: false,
        isLength: {
            options: {min: 1}
        },
        errorMessage: 'field-required'
    }
})