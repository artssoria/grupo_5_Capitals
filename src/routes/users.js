// users.js
const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/usersController');
const registerValidationForm =require('../middlewares/registerValidationForm');

router.get('/register', userControllers.registerRender);
router.get('/login', userControllers.login);
router.get('/listado-usuarios', userControllers.listado); // Ruta para listar usuarios
router.post('/carga-usuario', userControllers.cargaUsuario); // Ruta para cargar usuarios
router.post('/register', registerValidationForm, userControllers.userCreate);
router.post('/login', userControllers.handleLogin); // Ruta para manejar el inicio de sesión

module.exports = router;
