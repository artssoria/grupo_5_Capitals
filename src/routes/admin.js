const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const adminController = require('../controllers/adminController');
const middleValidationForm =require('../middlewares/middleValidationForm');

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

//Panel de Admin

router.get('/panel', adminController.renderPanel);

//Administrar productos

router.get('/carga-producto', adminController.renderFormCreateProduct);

router.post('/carga-producto', upload.single('imagen_product'), middleValidationForm, adminController.createProduct);

router.get('/modif-producto', adminController.listProducts);

router.get('/edit/:idProducto', adminController.renderFormUpdateProduct);

router.post('/edit/:idProducto', upload.single('imagen_product'), middleValidationForm, adminController.updateProduct);

router.delete('/delete/:idProducto', adminController.destroyProduct);

//Administrar usuarios

router.get('/listUsers', adminController.RenderListUsers);


module.exports = router;