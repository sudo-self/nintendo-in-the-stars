const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: 'http://10.0.0.214:8080' // Allow requests from this origin
}));
app.use(express.json());

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '337719',
    database: 'games_db'
});

// Connect to database
db.connect(err => {
    if (err) {
        console.error('Database connection error:', err); // Log any connection errors
        throw err;
    }
    console.log('Connected to MariaDB');
});

// Route to get the list of ROMs from the `nes` table
app.get('/roms', (req, res) => {
    db.query('SELECT name FROM nes', (error, results) => {
        if (error) {
            console.error('Database query error:', error); // Log any query errors
            return res.status(500).send(error);
        }
        console.log('Fetched ROMs:', results); // Log the results
        res.json(results);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});







