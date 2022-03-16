import express from 'express';
import Travel from './routesApp/Travel.js';
import Customer from './routesApp/Customer.js';
import Schedule from './routesApp/Schedule.js'

const router = express.Router();

router.use('/travel', Travel)

router.use('/customer', Customer)

router.use('/schedule', Schedule)

export default router;