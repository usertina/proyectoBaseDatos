const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Define la ruta de la base de datos
const dbPath = path.resolve(__dirname, 'Database.db');

// Crea el archivo de la base de datos si no existe
if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, '');
}

// Crear la conexión a la base de datos
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Ruta de ejemplo para obtener datos de la base de datos
app.get('/', (req, res) => {
    const sql = 'SELECT * FROM Menú';
    
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});
app.get('/chef', (req, res) => {
    const sql = 'SELECT * FROM Chefs';
    
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});
app.get('/categorias', (req, res) => {
    const sql = 'SELECT * FROM Categorías';
    
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});
app.get('/ingredientes', (req, res) => {
    const sql = 'SELECT * FROM Ingredientes';
    
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});
app.get('/especialidades', (req, res) => {
    const sql = 'SELECT * FROM Especialidades';
    
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});
app.get('/uno', (req, res) => {
    const sql = 'SELECT c.nombre AS Categoría, ch.nombre AS chefs, ch.especialidad FROM Categorías AS c JOIN Chefs AS ch ON c.id_categoria = ch.id_chef'
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});
app.get('/tina', (req, res) => {
            const sql = 'SELECT Menú.nombre AS plato, Categorías.nombre AS categoría, Chefs.nombre AS chef FROM  Menú JOIN Categorías ON Menú.id_categoria = Categorías.id_categoria JOIN Chefs ON Menú.id_chef = Chefs.id_chef'
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// Cerrar la conexión a la base de datos cuando se cierra el servidor
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error('Error closing the database:', err.message);
        }
        console.log('Database connection closed.');
        process.exit(0);
    });
});
