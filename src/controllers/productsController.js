const path = require('path');
const fs = require('fs');
const filePath = path.join(__dirname, '../data/products.json');
let db = require("../database/models");

const productsController = {
    listRender: async(req,res) => {
        try{
            let products = await db.Product.findAll({include: [{ association: "lodgings" }, { association: "services" }, { association: "regions" }]});
            res.render('listProducts', {products})
        }catch(err){
            return res.send('Error de servidor: ' + err)
        }
    }
}

module.exports = productsController;