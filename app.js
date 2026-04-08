const express = require('express');
const session = require('express-session');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(session({
    secret: 'cascaruso_secret',
    resave: false,
    saveUninitialized: true
}));

app.set('view engine', 'ejs');

// Middleware protección
function auth(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
}

const clientesRoutes = require('./routes/clientes');
const ventasRoutes = require('./routes/ventas');
const authRoutes = require('./routes/auth');

app.use('/', authRoutes);
app.use('/clientes', auth, clientesRoutes);
app.use('/ventas', auth, ventasRoutes);

app.get('/', auth, (req, res) => {
    res.render('index');
});

app.listen(3000, () => {
    console.log("🦀 Servidor con login en http://localhost:3000");
});