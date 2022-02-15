import express from 'express';
//import { Schema } from '../middlewares/Schema.js';
//import { getUsers, addUser, getUser, editUser, deleteUser, signIn, signOut, changePassword, verifyLogin, getUsersActive} from '../controllers/User.js';
import {getUsers, getUser, addUser, editUser, deleteUser,signIn, signOut,changePassword, verifyLogin, getUsersActive} from '../controllers/User.js';
import { Private } from '../middlewares/Auth.js';
import { Validators } from '../validators/UserValidator.js';

const router = express.Router();


router.get('/', Private, getUsers)
router.get('/:id', Private, getUser)
router.post('/new', Private, Validators, addUser)
router.post('/edit/:id', Private, Validators, editUser)
router.get('/delete/:id', Private, deleteUser)
router.get('/active/:id', Private, getUsersActive)
router.post('/login', signIn)
router.post('/logout', Private, signOut)
router.post('/change/password', Private, changePassword)
router.post('/verify', Private, verifyLogin)

export default router;