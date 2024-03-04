const path = require('path');
const fs = require('fs');

const adminController = {
    carga: (req,res) =>{
        res.render('carga-productos')
    },

    modif: (req,res) => {
        const filePath = path.join(__dirname, '../data/products.json');
        let obtenerProductos = fs.readFileSync(filePath, 'utf-8');
        let productos = JSON.parse(obtenerProductos);
        res.render('modif-productos', {listadoDeProductos: productos});

    },

    panel: (req,res) => {
        res.render('panel')
    }
};

module.exports = adminController;