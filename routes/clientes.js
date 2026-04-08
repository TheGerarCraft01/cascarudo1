const express = require('express');
const router = express.Router();
const db = require('../db');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: 'public/uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
});

const upload = multer({ storage });

// LISTAR
router.get('/', (req, res) => {
    db.query("SELECT * FROM clientes", (err, clientes) => {
        res.render('clientes', { clientes });
    });
});

// CREAR
router.post('/add', upload.single('foto'), (req, res) => {
    const { nombre, telefono, email } = req.body;

    if (!nombre || !telefono) {
        return res.send("❌ Datos obligatorios");
    }

    const foto = req.file ? req.file.filename : null;

    db.query("INSERT INTO clientes SET ?", {
        nombre, telefono, email, foto
    }, () => res.redirect('/clientes'));
});

// ELIMINAR
router.get('/delete/:id', (req, res) => {
    db.query("DELETE FROM clientes WHERE id=?", [req.params.id], () => {
        res.redirect('/clientes');
    });
});

// FORM EDITAR
router.get('/edit/:id', (req, res) => {
    db.query("SELECT * FROM clientes WHERE id=?", [req.params.id], (err, result) => {
        res.render('editarCliente', { cliente: result[0] });
    });
});

// ACTUALIZAR
router.post('/update/:id', upload.single('foto'), (req, res) => {
    const { nombre, telefono, email } = req.body;

    let data = { nombre, telefono, email };

    if (req.file) {
        data.foto = req.file.filename;
    }

    db.query("UPDATE clientes SET ? WHERE id=?", [data, req.params.id], () => {
        res.redirect('/clientes');
    });
});

module.exports = router;