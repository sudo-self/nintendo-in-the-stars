// server.js
const express = require('express');
const mariadb = require('mariadb');
const multer = require('multer');
const path = require('path');
const app = express();

// MariaDB Connection Pool
const pool = mariadb.createPool({
  host: 'localhost', // Replace with your database host
  user: 'root',      // Replace with your database user
  password: '337719', // Replace with your password
  database: 'games_db', // Your MariaDB database name
  connectionLimit: 5
});

// Middleware for parsing multipart/form-data (files)
const upload = multer({ dest: 'uploads/' });

// Serve static files (for your HTML)
app.use(express.static(path.join(__dirname, 'public')));

// Upload game file
app.post('/upload', upload.single('gameFile'), async (req, res) => {
  const file = req.file;
  const filePath = file.path;
  const fileName = file.originalname;

  try {
    // Save file info to the database
    const conn = await pool.getConnection();
    const query = 'INSERT INTO roms (name, file_path) VALUES (?, ?)';
    await conn.query(query, [fileName, filePath]);
    conn.release();
    
    // Respond with success message
    res.json({ message: 'File uploaded and saved to database!', fileName });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

