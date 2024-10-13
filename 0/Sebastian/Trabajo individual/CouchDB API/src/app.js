const express = require('express');
const reservasRoutes = require('./routes/reserva.routes.js');
const usuariosRoutes = require('./routes/usuario.routes.js');

require("./config/replication.js");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use('/api/reservas', reservasRoutes);
app.use('/api/usuario', usuariosRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
