const mysql = require('mysql2');

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    connectTimeout: 10000
});

db.connect(err => {
    if (err) {
        console.error("❌ Error de conexión:", err);
    } else {
        console.log("🦀 BD conectada correctamente");
    }
});

const PORT = process.env.PORT || 10000;

app.get('/', (req, res) => {
    res.send("🦀 Cascaruso funcionando en Render");
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🦀 Servidor corriendo en puerto ${PORT}`);
});

module.exports = db;