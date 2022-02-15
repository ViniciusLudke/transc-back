import { checkSchema } from 'express-validator';

export const Validators = checkSchema({
    profile: {
        optional: false,
        trim: true,
        isLength: {
            options: {min: 2}
        },
        errorMessage: 'field-required'
    }
})