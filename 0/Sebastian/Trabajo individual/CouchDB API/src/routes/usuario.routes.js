// routes/reservaRoutes.js
const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/usuario.controller');

const verifyToken = require("../middlewares/verifyToken");

router.post('/', usuarioController.crearUsuario);

//login
router.post('/login', usuarioController.loginUsuario);

//router.get('/', verifyToken, usuarioController.leerUsuarios);

router.get('/', verifyToken, usuarioController.leerUsuario);

router.put('/', verifyToken, usuarioController.actualizarUsuario);

router.delete('/', verifyToken, usuarioController.borrarUsuario);

module.exports = router;
