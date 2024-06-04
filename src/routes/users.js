// users.js
const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/usersController');
const registerValidationForm =require('../middlewares/registerValidationForm');
const middleGuest = require('../middlewares/middleGuest');
const middleAuth = require('../middlewares/middleAuth');

router.get('/register', middleGuest, userControllers.registerRender);
router.get('/login', middleGuest, userControllers.loginRender);
router.post('/login', userControllers.loginProcess);
router.get('/listado-usuarios', userControllers.listado); // Ruta para listar usuarios
// router.post('/carga-usuario', userControllers.cargaUsuario); // Ruta para cargar usuarios en JSON
router.post('/register', registerValidationForm, userControllers.userCreate);
// router.post('/login', userControllers.handleLogin); // Ruta para manejar el inicio de sesión
router.get('/profile', middleAuth, userControllers.profileRender);
router.get('/exit', userControllers.logOut);

module.exports = router;
