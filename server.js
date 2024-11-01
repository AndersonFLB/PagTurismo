//Importar las librerias
const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const mysql = require('mysql2');
const e = require('express');

//Crear una instancia de Express
const app = express();

//Definir el puerto
const PORT = 3000;

///Configurar el cuerpo - Json
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

//Uso de archivos carpeta public
app.use(express.static('public'));

//Configurar conexión a base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pagturismo',
});

//Verificar la conexión a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error de conexión' + err.stack);
        return;
    }
        console.log('Conectando a la base de datos como id ' + db.threadId);
});

//Ruta - Get
app.get('/contacto', (req, res) => {
    res.sendFile(__dirname + '/Public/contacto.html');
});

//Ruta - Post Envio del formulario - db

//Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});