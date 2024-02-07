const path = require('path');

const adminController = {
    carga: (req,res) =>{
        res.render('carga-productos')
    },

    modif: (req,res) => {
        res.render('modif-productos')
    },

    panel: (req,res) => {
        res.render('panel')
    }
};

module.exports = adminController;