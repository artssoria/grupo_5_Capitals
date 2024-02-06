const express = require('express');
const router = express.Router();
const path = require('path');
const homeController = require('../controllers/homeController')


router.get('/', homeController.home);

module.exports = router;