const express = require('express');
const router = express.Router();
const db = require('../db');

// Vista login
router.get('/login', (req, res) => {
    res.render('login');
});

// Procesar login
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    db.query(
        "SELECT * FROM usuarios WHERE username=? AND password=?",
        [username, password],
        (err, result) => {

            if (result.length > 0) {
                req.session.user = username;
                res.redirect('/');
            } else {
                res.send("❌ Usuario o contraseña incorrectos");
            }
        }
    );
});

// Logout
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

module.exports = router;