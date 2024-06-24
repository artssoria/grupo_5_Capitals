const path = require('path');
const fs = require('fs');
const filePath = path.join(__dirname, '../data/products.json');
const crypto = require('crypto');
const { validationResult } = require('express-validator');
let db = require("../database/models");


// let products = require('../data/products.json');

const adminController = {
    renderFormCreateProduct: (req,res) =>{
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
                    break;
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
                    break;
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
                    break;
                case "Yungas":
                    reg = 4;
                    break;
            }

            
            db.Product.create({
                name: req.body.nombre_product,
                description: req.body.descripcion,
                img: image,
                price: req.body.precio_product,
                lodgings_id: lod,
                services_id: serv,
                regions_id: reg
            })
            .then(() => {
                res.redirect('/admin/modif-producto');
            }).catch(error => {
                console.error("Error al crear el producto:", error);
                res.status(500).send("Error interno del servidor");
            });
        } else {
            res.render('carga-productos', {errors: errors.array(), old:req.body});
        }

    },

    // subir: (req,res) =>{
    //     let errors = validationResult(req);
    //     if (errors.isEmpty()) {
    //         let newProduct = req.body;

    //         newProduct.id = parseInt(`${products.length + 1}`);

    //         if(req.file){
    //             newProduct.imagen_product = "/images/" + req.file?.filename || "default-image.png";
    //         } else {
    //             newProduct.imagen_product = "/images/defecto.png";
    //         };

    //         products.push(newProduct);

    //         fs.writeFileSync( filePath, JSON.stringify(products, null, 4));

    //         res.redirect('/admin/modif-producto');
    //     } else {
    //         res.render('carga-productos', {errors: errors.array(), old:req.body});
    //     }
    // },

    // listado: (req,res) => {
    //     res.render('modif-productos', {products});
    // },

    listProducts: (req,res) => {
        db.Product.findAll({
            include: [{association: "regions"}, {association: "services"}, {association: "lodgings"}]
        })
            .then(function(products) {
                res.render("modif-productos", {products})
            })
    },

    renderPanel: (req,res) => {
        res.render('panel');
    },

    renderFormUpdateProduct: (req,res) => {
        db.Product.findByPk(req.params.idProducto, {include: 
        [{association: "regions"}, {association: "services"}, {association: "lodgings"}]})
            .then(function(product){
                res.render("productEdit", {product: product})
            })
    },

    // edit: (req,res) =>{
    //     let idToEdit = +req.params.idProducto;
    //     let idFound = products.find(e => e.id == idToEdit)
    //     res.render("productEdit", {idFound});
    // },

    updateProduct: (req,res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            let image;

            if(req.file) {
                image = "/images/" + req.file?.filename || "default-img.png";
            }else {
                db.Product.findByPk(req.params.idProducto)
                    .then(product => {
                        image = product.img;
                    })
            }

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
                    break
                default:
                    serv = "null";
            }

            switch(req.body.region_product){
                case "Valles":
                    reg = 1;
                    break;
                case "Quebrada":
                    reg = 2;
                    break;
                case "Puna":
                    reg = 3;
                    break;
                case "Yungas":
                    reg = 4
                    break;
            }

            db.Product.update({
                name: req.body.nombre_product,
                description: req.body.descripcion,
                img: image,
                price: req.body.precio_product,
                lodgings_id: lod,
                services_id: serv,
                regions_id: reg
            }, {
                where: {
                    id: req.params.idProducto
                }
            })
            .then(() => {
                res.redirect('/admin/modif-producto');
            }).catch(error => {
                console.error("Error al crear el producto:", error);
                res.status(500).send("Error interno del servidor");
            });
        } else {
            res.render('productEdit', {errors: errors.array(), old:req.body});
        }
    },

    // actualizar: (req,res)=>{
    //     let idToUpdate = +req.params.idProducto;
    //     const {nombre_product, descripcion, servicio_product, region_product, precio_product, hospedaje_product}= req.body;
    //     let idEncontrar = products.find(e => e.id == idToUpdate);
    //     let rutaOriginalImagen = idEncontrar.imagen_product;

    //     products.forEach(e => {
    //         if (e.id == idToUpdate){
    //             if(req.file){
    //                 e.nombre_product = nombre_product;
    //                 e.descripcion = descripcion;
    //                 e.imagen_product = '/images/' + req.file?.filename || 'default.png';
    //                 e.servicio_product = servicio_product;
    //                 e.region_product = region_product;
    //                 e.precio_product = precio_product;
    //                 e.hospedaje_product = hospedaje_product;
    //             }else{
    //                 e.nombre_product = nombre_product;
    //                 e.descripcion = descripcion;
    //                 e.imagen_product = rutaOriginalImagen;
    //                 e.servicio_product = servicio_product;
    //                 e.region_product = region_product;
    //                 e.precio_product = precio_product;
    //                 e.hospedaje_product = hospedaje_product;
    //             }
    //         };
    //     });
    //     fs.writeFileSync(
    //         filePath,
    //         JSON.stringify(products, null ,4),
    //         {
    //             encoding: "utf-8"
    //         }
    //     );
    //     res.redirect('/admin/modif-producto');
    // },

    destroyProduct: (req,res) => {
        db.Product.destroy({
            where: {
                id: req.params.idProducto
            }
        }).then(()=>{
            res.redirect('/admin/modif-producto')
        })
    },

    // eliminarProducto: (req,res) =>{
    //     let idToDelete = +req.params.idProducto;
    //     products = products.filter(e => e.id != idToDelete);

    //     fs.writeFileSync(
    //         filePath,
    //         JSON.stringify(products, null, 4),
    //         {
    //             encoding:"utf-8"
    //         }
    //     );
    //     res.redirect('/admin/modif-producto');
    // }

    RenderListUsers: (req,res) => {
        db.User.findAll({
            include: [{association: "nationalities"}, {association: "roles"}]
        })
        .then(function(users){
            res.render('listUsers', {users})
        })
    },
};

module.exports = adminController;