import Travel from '../models/Travel.js';
import TypeTravel from '../models/TypeTravel.js';
import { verifyDate, verifyValidators } from '../business/verify.js'

//import Period from '../models/Period.js'
//import { validationResult } from 'express-validator'
import { errorHandler } from '../errors/ErrorHandler.js';
//import imgHandler from '../business/imgHandler.js'


TypeTravel.hasMany(Travel, {foreignKey: 'idtypetravel'})
Travel.belongsTo(TypeTravel, {foreignKey: 'idtypetravel'})
/*
Activity.hasMany(Period, {foreignKey: 'idactivity'})
Period.belongsTo(Activity, {foreignKey: 'idactivity'})
*/

export const getTravel = async (req, res) => {
    let { schema } = res.locals
    let Tr = Travel.schema(schema)
    let TT = TypeTravel.schema(schema)
    Tr.findAll({
        raw: true, logging: true,
        order: [['idtravel', 'DESC']],
        include:[{
            model:TT,
            attributes:['typetravel']
        }]
    })
    .then(array => {
        array.map(a => {
            if(a.photo){
                const projectImage = a.photo.toString('base64')
                a['photo'] = projectImage
            }
        });
        return array;
    })
    .then(result =>{ 
       let typetravel = []
        result.map(a =>{
            typetravel.push({
                "idtypetravel": a.idtypetravel,
                "typetravel": a["typetravel.typetravel"]
            })
        })

        typetravel = typetravel.filter(function (a) {
            return !this[JSON.stringify(a)] && (this[JSON.stringify(a)] = true);
        }, Object.create(null))

        res.json({travel: result, typetravel})})
    .catch(err => errorHandler(res, err))
}
/*
export const getActivitiesTravel = async (req, res) => {
    let { schema } = res.locals
    let Tr = Travel.schema(schema)
    let TypeTr = TypeTravel.schema(schema)

    Tr.findAll({
        raw: true, logging: false,
        attributes:['idtravel', 'travel'],
        order: [['travel', 'asc']],
        where:{
            active: true
        },
        include:{
            model: TypeTr,
            attributes:[],
            where:{
                active: true
            }
        }
    })
    .then(result => res.json(result))
    .catch(err => errorHandler(res, err))
}
*/