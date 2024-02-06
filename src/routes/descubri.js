const express = require('express');
const router = express.Router();
const path = require('path');
const descubriController = require('../controllers/descubriController')


router.get('/puna', descubriController.puna);

router.get('/quebrada', descubriController.quebrada);

router.get('/valles', descubriController.valles);

router.get('/yungas', descubriController.yungas);

module.exports = router;