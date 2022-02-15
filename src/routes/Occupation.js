import express from 'express';
import { Schema } from '../middlewares/Schema.js';
import { getOccupation, getOccupations, addOccupation, editOccupation, deleteOccupation } from '../controllers/Occupation.js';
import { Private } from '../middlewares/Auth.js';
import { Validators } from '../validators/OccupationValidator.js';

const router = express.Router();

router.get('/', Schema, Private, getOccupations)
router.get('/:id', Schema, Private, getOccupation)
router.post('/new', Schema, Private, Validators, addOccupation)
router.post('/edit/:id', Schema, Private, Validators, editOccupation)
router.get('/delete/:id', Schema, Private, deleteOccupation)

export default router;