import { checkSchema } from 'express-validator';

export const Validators = checkSchema({
    bus: {
        optional: false,
        trim: true,
        isLength: {
            options: {min: 2}
        },
        errorMessage: 'field-required'
    },
    simultaneous: {
        isInt: {
            options: {
                min: 0, 
                max: 1000,
            },
            errorMessage: 'field-invalid'
        }
    }
})