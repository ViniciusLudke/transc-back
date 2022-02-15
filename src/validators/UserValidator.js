import { checkSchema } from 'express-validator';

export const Validators = checkSchema({
    name: {
        optional: false,
        trim: true,
        isLength: {
            options: {min: 2}
        },
        errorMessage: 'field-required'
    },
    email: {
        optional: false,
        isEmail: true,
        normalizeEmail: true,
        errorMessage: 'field-invalid'
    }
})