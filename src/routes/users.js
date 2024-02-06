const express = require('express');
const router = express.Router();
const path = require('path');
const userControllers = require('../controllers/usersController')


router.get('/register', userControllers.register);

router.get('/login', userControllers.login);

module.exports = router;