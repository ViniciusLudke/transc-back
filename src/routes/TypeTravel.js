import express from 'express';
import { getTypeTravel, getOneTypeActivity, addTypeTravel, editTypeTravel, deleteTypeTravel } from '../controllers/TypeTravel.js';
import { Validators } from '../validators/TypeTravelValidator.js';

const router = express.Router();

router.get('/', getTypeTravel)
router.get('/:id', getOneTypeActivity)
router.post('/new', Validators, addTypeTravel)
router.post('/edit/:id',  Validators, editTypeTravel)
router.get('/delete/:id',  deleteTypeTravel)

export default router;