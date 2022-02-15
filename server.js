import app from './app.js';

app.listen(process.env.PORT || 3003, () => console.log(`-- Servidor iniciado em ${process.env.BASE || 3003}`))