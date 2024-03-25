const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const carritoController = require('../controllers/carritoController');
const productosController = require('../controllers/productosController');

router.get('/listado-productos', productosController.listado);
router.post('/carga-producto', productosController.cargaProducto);

let productosCompletos = [];
let idCounter = 1; // Inicia el contador de ID

// Configura multer para almacenar los archivos cargados en la carpeta /public/images
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/images');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Agrega la fecha actual al nombre del archivo para evitar duplicados
    }
});
const upload = multer({ storage: storage });

 router.get('/carrito', carritoController.carrito);

router.get('/listado-productos', (req, res) => {
    fs.readFile(path.join(__dirname, '../data/products.json'), 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error al leer los datos');
            return;
        }
        let productos = JSON.parse(data);
        res.render('productos', { productos });
    });
});
/*
router.get('/carga-productos', (req, res) => {
    res.render('carga-productos');
});

router.post('/carga-productos', upload.single('imagen_product'), (req, res) => {
    const { nombre_product, descripcion, servicio_product, region_product, precio_product } = req.body;
    if (!nombre_product || !descripcion || !req.file || !servicio_product || !region_product || !precio_product) {
        res.status(400).send('Campos incompletos');
        return;
    }

    // Lee los productos existentes del archivo JSON
    fs.readFile(path.join(__dirname, '../data/products.json'), 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error al leer los datos');
            return;
        }
        let productos = JSON.parse(data);

        // Crea un nuevo producto con un ID único
        let newProducto = {
            id: productos.length > 0 ? productos[productos.length - 1].id + 1 : 1,
            nombre_product,
            descripcion,
            imagen_product: req.file ? '/images/' + req.file.filename : '', // Verifica si req.file existe antes de intentar acceder a req.file.filename
            servicio_product,
            region_product,
            precio_product
        };

        // Agrega el nuevo producto a los productos existentes
        productos.push(newProducto);

        // Guarda todos los productos en el archivo JSON
        fs.writeFile(path.join(__dirname, '../data/products.json'), JSON.stringify(productos, null, 2), (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error al guardar los datos');
                return;
            }
            res.render('productos', { productos });
        });
    });
}); */

module.exports = router;
