import { checkSchema } from 'express-validator';

export const Validators = checkSchema({
    day: {
        optional: false,
        matches: {
            options: /^[0-6]$/
        },
        errorMessage: 'field-invalid'
    },
    starttime: {
        optional: false,
        matches: {
            options: /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/
        },
        errorMessage: 'field-invalid'
    },
    endtime: {
        optional: false,
        matches: {
            options: /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/
        },
        errorMessage: 'field-invalid'
    }
})