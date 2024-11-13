const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Sirve archivos estáticos (CSS)
app.use(express.static(path.join(__dirname)));

// Ruta principal que sirve el archivo HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'pagina.html'));
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});