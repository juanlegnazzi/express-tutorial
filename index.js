/* Servidor con NODE

const http = require('http');

const server = http.createServer((req, res) => {
    res.status = 200;
    res.setHeader ('Content-Type', 'text/plain');
    res.end('Hello world');
});

server.listen(3000, () => {
    console.log('Serve on port 3000');
});
*/

//Servidor con EXPRESS
const express = require('express');
const { nextTick } = require('process');
const app = express();

//SETTINGS
app.set('appName', 'Fast Express Tutorial');
app.set('port', 3000);
app.set('view engine', 'ejs');

//PORT
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
    console.log(app.get('appName'));
});

//Middleware para que express entienda los formatos JSON
app.use(express.json());

//Middleware

/* Funcion Logger
function logger(req, res, next){
    console.log(`Route Received: ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
}

app.use(logger);
*/

//MORGAN (Middleware para ver informacion de la peticion)
const morgan = require('morgan');
app.use(morgan('dev'));

//Basic Routes
app.get('/get', (req, res) => {
    res.send('GET REQUEST RECEIVED');
});

app.post('/post', (req, res) => {
    res.send('POST REQUEST RECIEVED');
});

app.put('/put', (req, res) => {
    res.send('PUT REQUEST RECIEVED');
});

app.delete('/delete', (req, res) => {
    res.send('DELETE REQUEST RECIEVED');
});

//Middleware para usuarios
app.all('/user', (req, res, next) => {
    console.log('por aqui paso');
    next();
}); 

//Usuarios Routes
app.get('/user', (req, res) => {
    res.json({
        username: 'Juan',
        lastname: 'Leg'
    });
});

app.post('/user/:id', (req, res) => {
    console.log(req.body); //cuerpo de la peticion
    console.log(req.params); //parametro de la peticion
    res.send('USER CREATED');
});

app.put('/user/:id', (req, res) => {
    console.log(req.body);
    res.send(`USER ${req.params.id} UPDATED`);
});

app.delete('/user/:userId', (req, res) => {
    res.send(`USER ${req.params.userId} DELETED`);
});

//EJS Route
app.get('/', (req, res) => {
    const data = [{name: 'Chiche'}, {name: 'Ernest'}, {name: 'Arnaldo'}];
    res.render('index.ejs', {people: data});
});

//Middleware procesa todas las peticiones y devuelve un index.html
app.use(express.static('public'));