const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const romsDir = path.join(__dirname, '..', 'public', 'roms', 'retro');

app.use(express.static('public'));

app.get('/', (req, res) => {
    fs.readdir(romsDir, (err, files) => {
        if (err) {
            return res.status(500).send('Unable to scan directory: ' + err);
        }
        // Filter and format the file names
        const roms = files.map(file => file.replace(/\s+/g, '_').toLowerCase());
        // Create HTML for buttons
        let buttonsHtml = roms.map(rom => {
            return `<a class="rom-button" href="roms/retro/${rom}">Download ${rom}</a>`;
        }).join('\n');

        const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Retro ROMs</title>
            <style>
                body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; }
                .rom-button { display: block; margin: 10px 0; padding: 10px 20px; background-color: #007BFF; color: white; text-align: center; text-decoration: none; border-radius: 5px; }
                .rom-button:hover { background-color: #0056b3; }
            </style>
        </head>
        <body>
            <h1>Download Retro ROMs</h1>
            <div id="buttons-container">
                ${buttonsHtml}
            </div>
        </body>
        </html>
        `;

        res.send(html);
    });
});

// Export the Express app as the default export
module.exports = app;
