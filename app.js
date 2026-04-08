const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();

// 🔹 MIDDLEWARES
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 🔹 ARCHIVOS ESTÁTICOS
app.use(express.static(path.join(__dirname, 'public')));

// 🔹 SESIONES
app.use(session({
    secret: 'cascaruso_secret',
    resave: false,
    saveUninitialized: true
}));

// 🔹 MOTOR DE VISTAS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 🔹 FUNCIÓN DE AUTENTICACIÓN
function auth(req, res, next) {
    if (req.session.user) {
        return next();
    } else {
        res.redirect('/login');
    }
}

// 🔹 RUTAS
app.use('/', require('./routes/auth'));
app.use('/clientes', auth, require('./routes/clientes'));
app.use('/ventas', auth, require('./routes/ventas'));

// 🔹 DASHBOARD
app.get('/', auth, (req, res) => {
    res.render('index', {
        user: req.session.user
    });
});

// 🔹 MANEJO DE ERRORES (BONUS PRO)
app.use((req, res) => {
    res.status(404).send("❌ Página no encontrada");
});

// 🔹 PUERTO (🔥 CLAVE PARA RENDER)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🦀 Servidor corriendo en puerto ${PORT}`);
});