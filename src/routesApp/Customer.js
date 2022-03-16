import express from 'express';
import { Schema } from '../middlewares/Schema.js'
import { getCustomer, addCustomer, editCustomer, signIn, signOut, verifyLoginCustomer, changePassword } from '../controllersApp/Customer.js'
import {Private} from '../middlewares/AuthApp.js'
const router = express.Router();

router.post('/login', Schema, signIn)
router.get('/verify', Schema, Private, verifyLoginCustomer)
router.get('/logout', Schema, Private, signOut)
router.get('/', Schema, Private, getCustomer)
router.post('/new', Schema, addCustomer)
router.post('/edit', Schema, Private, editCustomer)
router.post('/change/password', Schema, Private, changePassword)

export default router;