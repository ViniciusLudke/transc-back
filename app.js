import dotenv from 'dotenv';
import express from 'express';
import routes from './src/routes.js'
import db from './src/db.js'
import fileUpload from 'express-fileupload';
import cors from 'cors'

dotenv.config()

const app = express();

app.use(express.static('./public'))
app.use(express.json())
app.use(cors())
app.use(fileUpload())

app.use(routes)

db.authenticate()

export default app;