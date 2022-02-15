import express from 'express';
import { getProfessionalsTravel, getProfessional,addProfessional, deleteProfessional, getAllProfessionals} from '../controllers/Professional.js';
import { Schema } from '../middlewares/Schema.js';
import { Private } from '../middlewares/Auth.js';
import { Validators } from '../validators/ProfessionalValidator.js';

const router = express.Router();

router.get('/', Schema, Private, getAllProfessionals)
router.get('/travel/:id', Schema, Private, getProfessionalsTravel)
router.get('/:id', Schema, Private, getProfessional)
router.post('/new', Schema, Private, Validators, addProfessional)
router.get('/delete/:id', Schema, Private, deleteProfessional)


export default router;