const path = require('path');

const adminController = {
    carga: (req,res) =>{
        res.render('carga-productos')
    }
};

module.exports = adminController;