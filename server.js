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
})

//Ruta - Post Envio del formulario - db
app.post('/contacto', (req, res) => {
    //Cuerpo de la solicitud
    const {name, email, phone, subject, message} = req.body;
    console.log(req.body);

    //Consulta a db para poder guardarlos
    const query = `INSERT INTO contactos (nombre, correo, telefono, asunto, mensaje) VALUES (?, ?, ?, ?, ?)`;
    db.query(query, [name, email, phone, subject, message], (err, results) => {
        if (err) {
            console.error('Error al guardar en la base de datos', err);
            return res.status(500).json({ error: 'Error al guardar la información'});
        }
        res.status(201).json({ message: 'Información guardada correctamente'});
    });
        console.log('Contacto guardado en la base de datos');
})

//Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
})