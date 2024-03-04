const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const adminController = require('../controllers/adminController');

const storage = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null, path.join(__dirname, '../../public/images'));
    },
    filename: (req,file,cb) =>{
        const newFilename = 'imagen-'+ Date.now() + path.extname(file.originalname);
        cb(null, newFilename);
    }
});

const upload = multer({storage});

router.get('/carga-producto', adminController.carga);

router.post('/carga-productos', upload.single('imagen_product'), adminController.subir);

router.get('/modif-producto', adminController.listado);

router.get('/panel', adminController.panel);

router.get('/edit/:idProducto', adminController.edit);

router.put('/edit', adminController.actualizar);

router.delete('/delete/:idProducto', adminController.eliminarProducto);

module.exports = router;