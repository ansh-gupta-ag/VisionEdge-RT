import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));
app.use('/dist', express.static(path.join(__dirname, '../dist')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/app', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/app.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Web viewer running at http://localhost:${PORT}`);
    console.log(`📸 LIVE CAMERA APP: http://localhost:${PORT}/app`);
    console.log(`📁 Serving from: ${path.join(__dirname, '../public')}`);
});
