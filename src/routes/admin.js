const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const adminController = require('../controllers/adminController');

router.get('/carga-producto', adminController.carga);

router.get('/modif-producto', adminController.listado);

router.get('/panel', adminController.panel);

router.get('/edit/:idProducto', adminController.edit);

router.put('/edit', (req,res) =>{
    res.send('Fui por PUT');
});

router.delete('/delete/:idProducto', (req,res) =>{
    res.send('FUI por DELETE');
})

module.exports = router;