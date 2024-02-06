const express = require('express');
const router = express.Router();
const path = require('path');
const carritoController = require('../controllers/carritoController')


router.get('/carrito', carritoController.carrito);

module.exports = router;