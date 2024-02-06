const path = require('path');

const productosController = {
    listado: (req, res) =>{
        res.render('productos')
    }
}

module.exports = productosController;