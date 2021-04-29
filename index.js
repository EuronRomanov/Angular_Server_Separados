const express = require('express');
const conectarDB = require('./config/db');
var cors = require('cors');

//Creación del servidor
const app=express();

//conectamosa la BD
conectarDB();
//midleware
app.use(cors());

app.use(express.json());

app.use('/api/productos', require('./routes/producto'));
//Definicion de ruta principal
/*app.get('/',(req, res)=>{
    res.send('Hola mundo');
})*/

app.listen(4000,()=>{
    console.log('El servidor esta corriendo perfectamente');
})