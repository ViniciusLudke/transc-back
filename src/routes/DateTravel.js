import express from 'express';
import { Schema } from '../middlewares/Schema.js';
import { getDateTravel, getOneDateTravel, addDateTravel, editDateTravel, deleteDateTravel, getDateTravelId } from '../controllers/DateTravel.js';
import { Private } from '../middlewares/Auth.js';
import { Validators } from '../validators/TravelValidator.js';

const router = express.Router();

router.get('/', Schema, Private, getDateTravel)
router.get('/:id', Schema, Private, getOneDateTravel)
router.get('/travel/:id', Schema, Private, getDateTravelId)
router.post('/new', Schema, Private, addDateTravel)
router.post('/edit/:id', Schema, Private, editDateTravel)
router.get('/delete/:id', Schema, Private, deleteDateTravel)
/*
router.get('/active', Schema, Private, getOneTravel) // listagens das atividades para o front
*/
export default router;