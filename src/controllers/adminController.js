const path = require('path');
const fs = require('fs');
const filePath = path.join(__dirname, '../data/products.json');
const crypto = require('crypto');
const { validationResult } = require('express-validator');
let db = require("../database/models");

let products = require('../data/products.json');

const adminController = {
    carga: (req,res) =>{
        res.render('carga-productos')
    },

    createProduct: (req,res) =>{
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            let image = req.body.imagen_product;

            if(req.file){
                image = "/images/" + req.file?.filename || "default-image.png";
            } else {
                image = "/images/defecto.png";
            };

            let lod;
            let serv;
            let reg;

            switch(req.body.hospedaje_product){
                case "Hotel":
                    lod = 1;
                    break;
                case "Hostal":
                    lod = 2;
                    break
                default:
                    lod = "null";
            }

            switch(req.body.servicio_product){
                case "Egresados":
                    serv = 1;
                    break;
                case "Familiar":
                    serv = 2;
                    break
                case "Express":
                    serv = 3;
                default:
                    serv = "null";
            }

            switch(req.body.region_product){
                case "Valles":
                    reg = 1;
                    break;
                case "Quebrada":
                    reg = 2;
                    break
                case "Puna":
                    reg = 3;
                case "Yungas":
                    reg = 4
                default:
                    reg = "null";
            }

            db.Products.create({
                name: req.body.nombre_product,
                description: req.body.descripcion,
                img: image,
                price: req.body.precio_product,
                lodgings_id: lod,
                services_id: serv,
                regions_id: reg
            });

            res.redirect('/admin/modif-producto');
        } else {
            res.render('carga-productos', {errors: errors.array(), old:req.body});
        }

    },

    subir: (req,res) =>{
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            let newProduct = req.body;

            newProduct.id = parseInt(`${products.length + 1}`);

            if(req.file){
                newProduct.imagen_product = "/images/" + req.file?.filename || "default-image.png";
            } else {
                newProduct.imagen_product = "/images/defecto.png";
            };

            products.push(newProduct);

            fs.writeFileSync( filePath, JSON.stringify(products, null, 4));

            res.redirect('/admin/modif-producto');
        } else {
            res.render('carga-productos', {errors: errors.array(), old:req.body});
        }
    },

    listado: (req,res) => {
        res.render('modif-productos', {products});
    },

    panel: (req,res) => {
        res.render('panel');
    },

    edit: (req,res) =>{
        let idToEdit = +req.params.idProducto;
        let idFound = products.find(e => e.id == idToEdit)
        res.render("productEdit", {idFound});
    },

    actualizar: (req,res)=>{
        let idToUpdate = +req.params.idProducto;
        const {nombre_product, descripcion, servicio_product, region_product, precio_product, hospedaje_product}= req.body;
        let idEncontrar = products.find(e => e.id == idToUpdate);
        let rutaOriginalImagen = idEncontrar.imagen_product;

        products.forEach(e => {
            if (e.id == idToUpdate){
                if(req.file){
                    e.nombre_product = nombre_product;
                    e.descripcion = descripcion;
                    e.imagen_product = '/images/' + req.file?.filename || 'default.png';
                    e.servicio_product = servicio_product;
                    e.region_product = region_product;
                    e.precio_product = precio_product;
                    e.hospedaje_product = hospedaje_product;
                }else{
                    e.nombre_product = nombre_product;
                    e.descripcion = descripcion;
                    e.imagen_product = rutaOriginalImagen;
                    e.servicio_product = servicio_product;
                    e.region_product = region_product;
                    e.precio_product = precio_product;
                    e.hospedaje_product = hospedaje_product;
                }
            };
        });
        fs.writeFileSync(
            filePath,
            JSON.stringify(products, null ,4),
            {
                encoding: "utf-8"
            }
        );
        res.redirect('/admin/modif-producto');
    },

    eliminarProducto: (req,res) =>{
        let idToDelete = +req.params.idProducto;
        products = products.filter(e => e.id != idToDelete);

        fs.writeFileSync(
            filePath,
            JSON.stringify(products, null, 4),
            {
                encoding:"utf-8"
            }
        );
        res.redirect('/admin/modif-producto');
    }
};

module.exports = adminController;