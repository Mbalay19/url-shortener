// Importamos las dependencias necesarias
require('dotenv').config(); // Carga las variables de entorno desde el archivo .env
const express = require('express');
const dns = require('dns');
const url = require('url');
const cors = require('cors');
const bodyParser = require('body-parser');

// Inicializamos la aplicación Express
const app = express();
const port = process.env.PORT || 3000;

// Configuramos middleware
app.use(cors()); // Permite peticiones desde cualquier origen
app.use(bodyParser.urlencoded({ extended: false })); // Para manejar datos de formularios
app.use(bodyParser.json()); // Para manejar JSON

// Servimos archivos estáticos desde la carpeta 'public'
app.use('/public', express.static(process.cwd() + '/public'));

// Base de datos en memoria para almacenar las URLs
// En un proyecto real usarías una base de datos como MongoDB
let urlDatabase = {};
let currentId = 1;

// Ruta principal - sirve la página HTML
app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Función para validar si una URL es válida
function isValidUrl(string) {
  try {
    const parsedUrl = new URL(string);
    // Verificamos que tenga protocolo http o https
    return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:';
  } catch (err) {
    return false;
  }
}

// Función para verificar si el hostname existe usando DNS
function verifyHostname(hostname) {
  return new Promise((resolve) => {
    dns.lookup(hostname, (err) => {
      if (err) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}

// POST /api/shorturl - Acorta una URL
app.post('/api/shorturl', async (req, res) => {
  const originalUrl = req.body.url;
  
  // Validación básica: verificar que se envió una URL
  if (!originalUrl) {
    return res.json({ error: 'invalid url' });
  }
  
  // Validación de formato de URL
  if (!isValidUrl(originalUrl)) {
    return res.json({ error: 'invalid url' });
  }
  
  try {
    // Extraemos el hostname de la URL para verificar con DNS
    const parsedUrl = new URL(originalUrl);
    const hostname = parsedUrl.hostname;
    
    // Verificamos que el hostname existe
    const hostnameExists = await verifyHostname(hostname);
    
    if (!hostnameExists) {
      return res.json({ error: 'invalid url' });
    }
    
    // Verificamos si la URL ya existe en nuestra base de datos
    for (let id in urlDatabase) {
      if (urlDatabase[id] === originalUrl) {
        return res.json({
          original_url: originalUrl,
          short_url: parseInt(id)
        });
      }
    }
    
    // Si la URL es nueva, la guardamos con un nuevo ID
    urlDatabase[currentId] = originalUrl;
    
    // Respondemos con la URL original y el ID asignado
    res.json({
      original_url: originalUrl,
      short_url: currentId
    });
    
    // Incrementamos el ID para la próxima URL
    currentId++;
    
  } catch (error) {
    // Si hay cualquier error durante el proceso
    res.json({ error: 'invalid url' });
  }
});

// GET /api/shorturl/:shorturl - Redirige a la URL original
app.get('/api/shorturl/:shorturl', (req, res) => {
  const shortUrl = req.params.shorturl;
  
  // Verificamos que el parámetro sea un número válido
  if (!/^\d+$/.test(shortUrl)) {
    return res.json({ error: 'invalid short url' });
  }
  
  // Buscamos la URL original en nuestra base de datos
  const originalUrl = urlDatabase[shortUrl];
  
  if (!originalUrl) {
    return res.json({ error: 'short url not found' });
  }
  
  // Redirigimos a la URL original
  res.redirect(originalUrl);
});

// Ruta para obtener todas las URLs almacenadas (útil para debugging)
app.get('/api/urls', (req, res) => {
  res.json(urlDatabase);
});

// Manejador de errores 404
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Iniciamos el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});

module.exports = app;
