import express from 'express';
import { Schema } from '../middlewares/Schema.js';
import { getBus, getOneBus, addBus, editBus, deleteBus } from '../controllers/Bus.js';
import { Private } from '../middlewares/Auth.js';
import { Validators } from '../validators/BusValidator.js';

const router = express.Router();

router.get('/', Schema, Private, getBus)
router.get('/:id', Schema, Private, getOneBus)
router.post('/new', Schema, Private, Validators, addBus)
router.post('/edit/:id', Schema, Private, Validators, editBus)
router.get('/delete/:id', Schema, Private, deleteBus)

export default router;