const path = require('path');
const fs = require('fs');
const filePath = path.join(__dirname, '../data/products.json');
const crypto = require('crypto');
const products = require('../data/products.json');

const adminController = {
    carga: (req,res) =>{
        res.render('carga-productos')
    },

    subir: (req,res) =>{
        let newProduct = req.body;

        newProduct.id = `${products.length + 1}`;

        newProduct.imagen_product = "/images/" + req.file?.filename || "default-image.png";

        products.push(newProduct);

        fs.writeFileSync( filePath, JSON.stringify(products, null, 2));

        res.redirect('/admin/modif-producto');
    },

    listado: (req,res) => {
        let obtenerProductos = fs.readFileSync(filePath, 'utf-8');
        let productos = JSON.parse(obtenerProductos);
        res.render('modif-productos', {listadoDeProductos: productos});

    },

    panel: (req,res) => {
        res.render('panel');
    },

    edit: (req,res) =>{
        let obtenerProductos = fs.readFileSync(filePath, 'utf-8');
        let productos = JSON.parse(obtenerProductos);
        let idProducto = (req.params.idProducto)- 1;
        let productoToEdit = productos[idProducto];
        res.render("productEdit", {'productoToEdit': productoToEdit});
    },

    actualizar: (req,res)=>{
        const { id, nuevaInfo } = req.body;
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
              console.error(err);
              return res.status(500).send('Error al leer el archivo');
            }
      
            let products = JSON.parse(data);

            const productIndex = products.findIndex(product => product.id === id);

            if (productIndex === -1) {
                return res.status(404).send('Producto no encontrado');
            };

            products[productIndex] = { ...products[productIndex], ...nuevaInfo };

            fs.writeFile(filePath, JSON.stringify(products, null, 2), err => {
                if (err) {
                  console.error(err);
                  return res.status(500).send('Error al escribir en el archivo');
                };
            });
        });
    }
};

module.exports = adminController;