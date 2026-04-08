const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
    db.query("SELECT * FROM clientes", (err, clientes) => {

        db.query(`
            SELECT ventas.*, clientes.nombre 
            FROM ventas 
            JOIN clientes ON ventas.cliente_id = clientes.id
        `, (err2, ventas) => {

            res.render('ventas', { ventas, clientes });
        });
    });
});

router.get('/delete/:id', (req, res) => {
    db.query("DELETE FROM ventas WHERE id=?", [req.params.id], () => {
        res.redirect('/ventas');
    });
});

router.post('/add', (req, res) => {
    const { cliente_id, producto, monto } = req.body;

    if (!cliente_id || !producto || !monto) {
        return res.send("❌ Campos obligatorios");
    }

    db.query("INSERT INTO ventas SET ?", { cliente_id, producto, monto }, () => {
        res.redirect('/ventas');
    });
});


module.exports = router;