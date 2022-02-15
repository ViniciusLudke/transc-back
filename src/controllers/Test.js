import db from '../db.js'

export const testCompany = async (req, res) => {
    let { company } = req.params;
    db.query('SELECT exists (select 1 from information_schema.schemata where schema_name = :schema)', {
        replacements: {
            schema: `company_${company}`
        }
    }) 
    
    .then(result => result[0][0].exists ? res.send('connected') : res.status(400).json({errors: [{msg: 'company not found'}]}))
    .catch(err => res.status(400).send(err))
} 