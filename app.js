const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express(); // 🔥 IMPORTANTE

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Sesiones
app.use(session({
    secret: 'cascaruso_secret',
    resave: false,
    saveUninitialized: true
}));

// Motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware auth
function auth(req, res, next) {
    if (req.session.user) return next();
    res.redirect('/login');
}

// Rutas
app.use('/', require('./routes/auth'));
app.use('/clientes', auth, require('./routes/clientes'));
app.use('/ventas', auth, require('./routes/ventas'));

// Dashboard
app.get('/', auth, (req, res) => {
    res.render('index', { user: req.session.user });
});

// Error 404
app.use((req, res) => {
    res.status(404).send("❌ Página no encontrada");
});

// 🔥 PUERTO RENDER
const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🦀 Servidor corriendo en puerto ${PORT}`);
});