const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const adminController = require('../controllers/adminController');
const { body } = require('express-validator');

const storage = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null, path.join(__dirname, '../../public/images'));
    },
    filename: (req,file,cb) =>{
        const newFilename = 'imagen-'+ Date.now() + path.extname(file.originalname);
        cb(null, newFilename);
    }
});

//Validaciones del formulario de carga producto (agregar un nuevo producto a JSON)
let validacionFormProduct = [
    body('nombre_product').notEmpty().withMessage('Debes agregar el nombre del producto'),
    body('descripcion').notEmpty().withMessage('Debes agregar alguna descripcion'),
    body('servicio_product').notEmpty().withMessage('Debes seleccionar un servicio'),
    body('hospedaje_product').notEmpty().withMessage('Debes seleccionar un hospedaje'),
    body('precio_product').notEmpty().withMessage('Debes agregar el precio'),
    body('region_product').notEmpty().withMessage('Debes seleccionar la region')
]

const upload = multer({storage});

router.get('/carga-producto', adminController.carga);

router.post('/carga-producto', upload.single('imagen_product'), validacionFormProduct, adminController.createProduct);

router.get('/modif-producto', adminController.listado);

router.get('/panel', adminController.panel);

router.get('/edit/:idProducto', adminController.edit);

router.put('/edit/:idProducto', upload.single('imagen_product'), validacionFormProduct, adminController.actualizar);

router.delete('/delete/:idProducto', adminController.eliminarProducto);

module.exports = router;