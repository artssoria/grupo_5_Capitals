const express = require('express');
const router = express.Router();
const path = require('path');
const carritoController = require('../controllers/carritoController');
const productosController = require('../controllers/productosController');



router.get('/carrito', carritoController.carrito);
router.get('/listado-productos', productosController.listado);

module.exports = router;