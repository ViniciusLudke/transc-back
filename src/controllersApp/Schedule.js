import Period from '../models/Period.js'
import Professional from '../models/Professional.js'
import Travel from '../models/Travel.js'
import User from '../models/User.js'
import Occupation from '../models/Occupation.js'
import Schedule from '../models/Schedule.js'
import db from '../db.js'
import moment from 'moment'
//import periodHandler from '../business/periodHandler.js'
//import { errorHandler } from '../errors/ErrorHandler.js'
//import { ToInt, ToString, Times } from '../business/periodHandler.js'

Travel.hasMany(Period, {foreignKey:'idtravel'})
Period.belongsTo(Travel, {foreignKey:'idtravel'})

Travel.hasMany(Professional, {foreignKey:'idtravel'})
Professional.belongsTo(Travel, {foreignKey:'idtravel'})

Travel.hasMany(Schedule, {foreignKey: 'idtravel'})
Schedule.belongsTo(Travel, {foreignKey: 'idtravel'})


export const Availability = async (req, res) => {
    let { schema } = res.locals
    let { id } = req.params
    let { date, day } = req.query
    let Per = Period.schema(schema)
    let Pro = Professional.schema(schema)
    let Tr = Travel.schema(schema)
    let Sch = Schedule.schema(schema)
    let Usr = User.schema(schema)
    let Ocp = Occupation.schema(schema)
/*


    let travel = await Tr.findAll({
        logging: false,
        raw: true,
        attributes:['ussualy', 'day']
        where:{
            idtravel: id,
            status: true,
        },
    })

*/

res.send('testando')

}



/*
export const Availability = async (req, res) => {
    let { schema } = res.locals
    let { id } = req.params
    let { date, day } = req.query

    let Per = Period.schema(schema)
    let Pro = Professional.schema(schema)
    let Act = Travel.schema(schema)
    let Sch = Schedule.schema(schema)
    let Usr = User.schema(schema)
    let Ocp = Occupation.schema(schema)

    Act.findAll({
        raw:true,
        logging: false,
        attributes: ['duration'],
        where: {
            idactivity: id,
            active: true
        },
        include: [{
            model: Per,    
            where: {
                day
            }   
        },{
            model: Pro,
            attributes: ['idprofessional'],
            order: ['idprofessional'],
            include: {
                model: Usr,
                attributes:['name'],
                where: {
                    active: true
                },
                include: {
                    raw: true,
                    model: Ocp,
                    attributes:['occupation']
                }
            }
        }]    
    })
    .then(async result => {
        let periodlist = [], auxlist = [], aux2 = []
        let count, max

        for(let i in result){
            
            aux2 = await periodHandler(result[i]['periods.starttime'], result[i]['periods.endtime'], result[i].duration, date)
           
            for(let j in aux2){
                
                auxlist.push({
                    ...result[i],
                    "periods.starttime": aux2[j].starttime,
                    "periods.endtime": aux2[j].endtime
                })
            }
        }

        for(let i in auxlist){
            max = await Act.findByPk(id, {raw:true, logging: false, attributes: ['simultaneous']})  
            count = await Sch.count({
                logging: false,
                where: {
                    idactivity: id,
                    idprofessional: auxlist[i]["professionals.idprofessional"],
                    starttime: auxlist[i]["periods.starttime"],
                    endtime: auxlist[i]["periods.endtime"],
                    date,
                }
            })
            if(max.simultaneous == 0){
                periodlist.push(auxlist[i])
            }else if(max.simultaneous > count){
                periodlist.push({...auxlist[i], left: max.simultaneous-count})
            }
        }

        let filterList = [], unique = [], plist = []

        periodlist.map(i => {
            plist.push(i["professionals.user.iduser"])
        })

        unique = [...new Set(plist)];

        for(let i in unique){
            let a = await Usr.findByPk(unique[i], {raw: true, logging: false, attributes: ['name', 'photo', 'mimetype']})
            
            if(a.photo){
                const projectImage = a.photo.toString('base64')
                a.photo = projectImage
            
            };
            
            filterList.push({
                professional: a.name,
                photo: a.photo,
                mimetype: a.mimetype,
                periods: periodlist.filter(j => {
                    return j["professionals.user.name"].search(a.name) !== -1
                })
            })
        }
        
        res.send(filterList)
        
    }).catch(err => errorHandler(res, err))
}*/