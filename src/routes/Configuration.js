import express from 'express';
import { Schema } from '../middlewares/Schema.js';
import { Private } from '../middlewares/Auth.js';
//import { Validators } from '../validators/ConfigurationValidator.js';
import { getConfigs, addConfig, editConfig } from '../controllers/Configuration.js';
const router = express.Router();

router.get('/:id', Schema, getConfigs)
router.post('/new', Schema, Private, addConfig)
router.post('/edit/:id', Schema, Private, editConfig)

export default router;