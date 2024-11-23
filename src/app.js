const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const session = require('express-session');
const flash = require('connect-flash');

const app = express();

// Configurar la sesión
app.use(session({
    secret: 'tuSecreto',
    resave: false,
    saveUninitialized: true
}));

// Configurar flash
app.use(flash());

// Middlewares de session
app.use((req, res, next) => {
    res.locals.successMessage = req.flash('successMessage');
    res.locals.errorMessage = req.flash('errorMessage');
    next();
});

// Configuraciones de la app
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'proyectoNode'
}, 'single'));
app.use(express.urlencoded({ extended: false }));

// Rutas
const customerRoutes = require('./routes/customer');
app.use('/', customerRoutes);

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Iniciar el servidor
app.listen(app.get('port'), () => {
    console.log('Servidor en el puerto 3000');
});
