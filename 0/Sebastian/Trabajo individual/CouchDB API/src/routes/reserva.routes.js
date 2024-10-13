// routes/reservaRoutes.js
const express = require('express');
const router = express.Router();

const reservaController = require('../controllers/reserva.controller');

const verifyToken = require("../middlewares/verifyToken");

// Crear nueva reserva
router.post("/", verifyToken, reservaController.crearReserva);

// Obtener reservas de usuario
router.get("/user", verifyToken, reservaController.leerReservasPorUsuario);

// Obtener reservas
router.get('/', verifyToken, reservaController.leerReservas);

// Obtener reserva con id
router.get('/:id', verifyToken, reservaController.leerReservaPorId);

// Actualizar una reserva
router.put("/:id", verifyToken, reservaController.actualizarReserva);

// Borrar una reserva
router.delete("/:id", verifyToken, reservaController.borrarReserva);

module.exports = router;
