// users.js
const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/usersController');

router.get('/register', userControllers.register);
router.get('/login', userControllers.login);
router.get('/listado-usuarios', userControllers.listado); // Ruta para listar usuarios
router.post('/carga-usuario', userControllers.cargaUsuario); // Ruta para cargar usuarios
router.post('/register', userControllers.cargaUsuario);
router.post('/login', userControllers.handleLogin); // Ruta para manejar el inicio de sesión

module.exports = router;
