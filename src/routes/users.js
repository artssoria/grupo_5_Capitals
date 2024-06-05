// users.js
const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/usersController');
const registerValidationForm = require('../middlewares/registerValidationForm');
const middleGuest = require('../middlewares/middleGuest');
const middleAuth = require('../middlewares/middleAuth');
const multer = require('multer');
const upload = require('../middlewares/middleMulter');
const middleValidUpdateUser = require('../middlewares/middleValidUpdateUser');
const middlePassModifValidator = require('../middlewares/middlePassModifValidator');


router.get('/register', middleGuest, userControllers.registerRender);
router.get('/login', middleGuest, userControllers.loginRender);
router.post('/login', userControllers.loginProcess);
router.get('/listado-usuarios', userControllers.listado); // Ruta para listar usuarios
// router.post('/carga-usuario', userControllers.cargaUsuario); // Ruta para cargar usuarios en JSON
router.post('/register', registerValidationForm, userControllers.userCreate);
// router.post('/login', userControllers.handleLogin); // Ruta para manejar el inicio de sesión en JSON
router.get('/profile', middleAuth, userControllers.profileRender);
router.get('/exit', userControllers.logOut);
router.get('/modifProfile/:idUser', middleAuth, userControllers.modifProfileRender);
router.post('/modifProfile/:idUser', upload.single('profile_img'), middleAuth, middleValidUpdateUser, userControllers.updateUser);
router.get('/modifPassword/:idUser', middleAuth, userControllers.modifPassRender);
router.post('/modifPassword/:idUser', middleAuth, middlePassModifValidator, userControllers.updatePass);

module.exports = router;
