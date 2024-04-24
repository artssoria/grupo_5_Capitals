const fs = require('fs');
const path = require('path');

let productosCompletos = [];

const productosController = {
    listado: (req, res) => {
        //usar el modelo de sequelize en vez del json
        fs.readFile(path.join(__dirname, '../data/products.json'), 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error al leer los datos');
                return;
            }
            let productos = JSON.parse(data);
            res.render('productos', { productos });
        });
    },

    // esta función no va, es de adminController
    cargaProducto: (req, res) => {
        const upload = req.app.get('upload');
        upload.single('imagen_product')(req, res, (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error al cargar la imagen');
                return;
            }

            const { nombre_product, descripcion, servicio_product, region_product, precio_product } = req.body;
            if (!nombre_product || !descripcion || !req.file || !servicio_product || !region_product || !precio_product) {
                res.status(400).send('Campos incompletos');
                return;
            }
            let newProducto = {
                nombre_product,
                descripcion,
                imagen_product: '/images/' + req.file.filename, // Usa la ruta del archivo cargado
                servicio_product,
                region_product,
                precio_product
            };
            productosCompletos.push(newProducto);

            // Guarda los productos en un archivo JSON
            fs.writeFile(path.join(__dirname, '../data/products.json'), JSON.stringify(productosCompletos, null, 2), (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Error al guardar los datos');
                    return;
                }
                res.render('productos', { productos: productosCompletos });
            });
        });
    }
};

module.exports = productosController;
