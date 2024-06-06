const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const middleGuest = require('../middlewares/middleGuest');
const middleAuth = require('../middlewares/middleAuth');

router.get('/list', middleAuth, productsController.listRender);
router.get('/search', middleAuth, productsController.search);
router.get('/detail/:idProduct', middleAuth, productsController.productDetail);

module.exports = router;