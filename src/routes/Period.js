import express from 'express';
import { Schema } from '../middlewares/Schema.js';
import { Private } from '../middlewares/Auth.js';
import { Validators } from '../validators/PeriodValidator.js'
import { getPeriods, getPeriod, addPeriod, editPeriod, deletePeriod } from '../controllers/Period.js';

const router = express.Router();

router.get('/travel/:id', Schema, Private, getPeriods)
router.get('/:id', Schema, Private, getPeriod)
router.post('/new', Schema, Private, Validators, addPeriod)
router.post('/edit/:id', Schema, Private, Validators, editPeriod)
router.get('/delete/:id', Schema, Private, deletePeriod)

export default router;