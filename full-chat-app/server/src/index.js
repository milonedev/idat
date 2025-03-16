const express = require('express')
const path = require('path')
const cors = require('cors')

const app = express();

// confiuar el uso del formato json
app.use(express.json());
// configuracion de cors
app.use(cors());
// Cargar vaiarbles de entorn
require('dotenv').config();

// Usar la coneecion la base de datos;
require('./database/config.js').dbConnection();

const PORT = process.env.PORT || 4000

const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server, {
    cors: {
        origin: 'http://localhost:4322', // Allow your Astro frontend
        methods: ['GET', 'POST'],       // Allowed methods for Socket.IO
        credentials: true              // If you're using cookies/auth
    }
});
require('./sockets/socket.js');

// routes
app.use('/api/login', require('./routes/auth.js'))
app.use('/api/users', require('./routes/users.js'))
app.use('/api/messages', require('./routes/messages.js'))


server.listen(PORT, (err) => {
    if (err) throw new Error(err);
    console.log('The server is running on PORT:', PORT)
})