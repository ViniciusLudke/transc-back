import express from 'express';
import { Schema } from '../middlewares/Schema.js';
import { getProfiles, addProfile, getProfile, editProfile, deleteProfile } from '../controllers/Profile.js';
import { Private } from '../middlewares/Auth.js';
import { Validators } from '../validators/ProfileValidator.js';
const router = express.Router();

router.get('/', Schema, Private, getProfiles)
router.get('/:id', Schema, Private, getProfile)
router.post('/new', Schema, Private, Validators, addProfile)
router.post('/edit/:id', Schema, Private, Validators, editProfile)
router.get('/delete/:id', Schema, Private, deleteProfile)

export default router;