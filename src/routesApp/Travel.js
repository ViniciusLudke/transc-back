import express from 'express';
import { Schema } from '../middlewares/Schema.js';
import { getTravel} from '../controllersApp/Travel.js';
import { Private } from '../middlewares/Auth.js';
import { Validators } from '../validators/TravelValidator.js';

const router = express.Router();

router.get('/active', Schema, getTravel)
/*
router.get('/active', Schema, Private, getOneTravel) // listagens das atividades para o front
*/
export default router;