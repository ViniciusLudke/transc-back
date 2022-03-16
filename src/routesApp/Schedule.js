import express from 'express';
import { Schema } from '../middlewares/Schema.js';
import { Availability} from '../controllersApp/Schedule.js';
import { Private } from '../middlewares/Auth.js';

const router = express.Router();

router.get('/availability', Schema, Availability)
/*
router.get('/active', Schema, Private, getOneTravel) // listagens das atividades para o front
*/
export default router;