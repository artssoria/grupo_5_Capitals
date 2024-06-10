const path = require('path');
const fs = require('fs');
const filePath = path.join(__dirname, '../data/products.json');
let db = require("../database/models");
const Op = db.Sequelize.Op;

const productsController = {
    listRender: async(req,res) => {
        try{
            let products = await db.Product.findAll({include: [{ association: "lodgings" }, { association: "services" }, { association: "regions" }]});
            let [lodgings, services, regions] = await Promise.all([
                db.Lodging.findAll(),
                db.Service.findAll(),
                db.Region.findAll()
            ]);
            let session = req.session.userLogged;
            res.render('listProducts', {products, lodgings, services, regions, session})
        }catch(err){
            return res.send('Error de servidor: ' + err)
        }
    },
    search: async(req,res) => {
        try{
            let userFind = req.query.search;
            let findlod;
            let findser;
            let findreg;
            if (req.query.lodgings_id == 0) {
                findlod = [1,2];
            }else{
                findlod = req.query.lodgings_id;
            }
            if(req.query.services_id == 0){
                findser = [1,2,3];
            }else{
                findser = req.query.services_id;
            }
            if(req.query.regions_id == 0){
                findreg = [1,2,3,4];
            }else{
                findreg = req.query.regions_id;
            }
            let products = await db.Product.findAll({
                where: {
                    name: {[Op.substring]: userFind},
                    lodgings_id: findlod,
                    services_id: findser,
                    regions_id: findreg
                },
                include: [{ association: "lodgings" }, { association: "services" }, { association: "regions" }]
            });
            let [lodgings, services, regions] = await Promise.all([
                db.Lodging.findAll(),
                db.Service.findAll(),
                db.Region.findAll()
            ]);
            let session = req.session.userLogged;
            res.render('listProducts', {products, lodgings, services, regions, session})

        }catch(err){
            res.send('Error en el servidor: '+ err)
        }
    },
    productDetail: async(req,res) => {
        try{
            let value = req.params.idProduct;
            let product = await db.Product.findByPk(value, {include: [{association: "lodgings"}, {association: "services"}, {association: "regions"}]});
            let session = req.session.userLogged;
            res.render('productDetail', {product, session})
        }catch(err){
            res.send('Error de servidor: ' + err)
        }
    }
}

module.exports = productsController;