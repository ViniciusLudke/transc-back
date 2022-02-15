import express from 'express';
import { Schema } from './middlewares/Schema.js';
import { Private } from './middlewares/Auth.js';
import { testCompany } from './controllers/Test.js';
import User from './routes/User.js';
import TypeTravel from './routes/TypeTravel.js';
import Profile from './routes/Profile.js'
import Occupation from './routes/Occupation.js';
import Travel from './routes/Travel.js';
import Period from './routes/Period.js';
import Professional from './routes/Professional.js';
import Bus from './routes/Bus.js';

const router = express.Router();

router.get('/testcompany/:company', testCompany)

router.get('/ping', (req, res) => {
    res.send('<h1>Pong</h1>')
})

router.get('/middleware', Schema, Private, (req,res)=>{
    res.send('OKAY')
})

router.use('/user',Schema, User)

router.use('/typetravel',Schema, Private, TypeTravel)

router.use('/profile', Profile)

router.use('/occupation', Occupation)

router.use('/travel', Travel)

router.use('/professional', Professional)

router.use('/period', Period)

router.use('/bus', Bus)

export default router;