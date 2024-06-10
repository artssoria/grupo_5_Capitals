const express = require('express');
const router = express.Router();
const cartsController = require('../controllers/cartsController');
const middleGuest = require('../middlewares/middleGuest');
const middleAuth = require('../middlewares/middleAuth');

router.get('/:user/:idCart', middleAuth, cartsController.cartRender);
router.post('/:user/:idCart/:idProduct', middleAuth, cartsController.addProductCart);
router.post('/:user/:idCart/:idProduct/delete', middleAuth, cartsController.deleteProductCart);
router.post('/finish/:user/:idCart/sale/safe', middleAuth, cartsController.finishSale);
router.get('/finish', middleAuth, cartsController.finishMessage);



module.exports = router;