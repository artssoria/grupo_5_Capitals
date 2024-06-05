const express = require('express');
const router = express.Router();
const productsController = require('../controllers/usersController');
const middleGuest = require('../middlewares/middleGuest');
const middleAuth = require('../middlewares/middleAuth');

router.get('/list', productsController.listRender)