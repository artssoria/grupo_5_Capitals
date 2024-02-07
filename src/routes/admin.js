const express = require('express');
const router = express.Router();
const path = require('path');
const adminController = require('../controllers/adminController');

router.get('/carga-producto', adminController.carga);

router.get('/modif-producto', adminController.modif);

router.get('/panel', adminController.panel);

module.exports = router;