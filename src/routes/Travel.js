import express from 'express';
import { Schema } from '../middlewares/Schema.js';
import { getTravel, getOneTravel, addTravel, editActivity, deleteTravel } from '../controllers/Travel.js';
import { Private } from '../middlewares/Auth.js';
import { Validators } from '../validators/TravelValidator.js';

const router = express.Router();

router.get('/', Schema, Private, getTravel)
router.get('/:id', Schema, Private, getOneTravel)
router.post('/new', Schema, Private, Validators, addTravel)
router.post('/edit/:id', Schema, Private, Validators, editActivity)
router.get('/delete/:id', Schema, Private, deleteTravel)
/*
router.get('/active', Schema, Private, getOneTravel) // listagens das atividades para o front
*/
export default router;