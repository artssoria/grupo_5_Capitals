const path = require('path');
const fs = require('fs');
const filePath = path.join(__dirname, '../data/products.json');
let db = require("../database/models");
const Op = db.Sequelize.Op;

const cartsController = {
    cartRender: async(req,res) =>{
        try{
            let cartProducts = await db.ProductCart.findAll({where:{carts_id:req.params.idCart}, include:[{association: "products"}, {association:"carts"}]});

            if(cartProducts.length > 0){
                let priceFinal = 0;
                let amountFinal = 0;
                for(let cartproduct in cartProducts){
                    priceFinal += cartProducts[cartproduct].products.price * cartProducts[cartproduct].amount_products;
                    amountFinal += cartProducts[cartproduct].amount_products;
                };
                await db.Cart.update({
                    total_price: priceFinal,
                    amount_elements: amountFinal
                    },
                    {
                        where: {id:req.params.idCart, concreted: 0}
                    }
                );
                let carts = await db.Cart.findOne({
                    where: {id: req.params.idCart, concreted: 0}
                });
                let session = req.session.userLogged;

                res.render('cart', {cartProducts, carts, session})
            }else{
                let cartProducts = await db.ProductCart.findAll({where:{carts_id:req.params.idCart}, include:[{association: "products"}, {association:"carts"}]});
                await db.Cart.update({
                    total_price: 0,
                    amount_elements: 0
                    },
                    {
                        where: {id:req.params.idCart, concreted: 0}
                    }
                );
                let carts = await db.Cart.findOne({
                    where: {id: req.params.idCart, concreted: 0}
                });
                let session = req.session.userLogged;
                res.render('cart', {cartProducts, carts, session} )
            }
        }catch(err){
            res.send('Internal error server: '+err)
        }
    },
    addProductCart: async (req,res) =>{
        try{
            let productCartVerify = await db.ProductCart.findOne({where: {carts_id:req.params.idCart, products_id:req.params.idProduct}});

            if(productCartVerify){
                let temporalTotal = productCartVerify.amount_products + 1;
                await db.ProductCart.update({
                    amount_products: temporalTotal
                },
                {
                    where: {products_id:req.params.idProduct, carts_id:req.params.idCart}
                }
                );
                
                res.redirect('/carts/'+ req.session.userLogged.first_name + '/' + req.params.idCart);
            }else{
                await db.ProductCart.create({
                        amount_products: 1,
                        carts_id: req.params.idCart,
                        products_id: req.params.idProduct
                    }
                );
                res.redirect('/carts/'+ req.session.userLogged.first_name + '/' + req.params.idCart);
            }
        }catch(err){
            res.send('Internal Server Error 27: '+err)
        }
    },
    deleteProductCart: async (req,res) =>{
        try{
            let cartProduct = await db.ProductCart.findOne({
                where: {id: req.params.idProduct}
            });
            if(cartProduct.amount_products > 1){
                await db.ProductCart.update({
                        amount_products: cartProduct.amount_products - 1,
                    },
                    {
                        where:{id:req.params.idProduct}
                    }
                );
                res.redirect('/carts/'+ req.session.userLogged.first_name + '/' + req.params.idCart);
            }else{
                await db.ProductCart.destroy({
                        where:{id:req.params.idProduct}
                    }
                );
                res.redirect('/carts/'+ req.session.userLogged.first_name + '/' + req.params.idCart);
            }
        }catch(err){
            res.send('Internal Server Error: '+err)
        }
    },

    finishSale: async(req,res) =>{
        try{
            let userDb = await db.User.findOne({where: {email:req.session.userLogged.email}});
            await db.Cart.create({
                concreted: 0,
                total_price: 0,
                amount_elements: 0,
                users_id: userDb.id
            });

            await db.Cart.update({
                concreted: 1
            },
            {
                where: {id: req.params.idCart}
            }
            );

            let carts = await db.Cart.findOne({where: {users_id: userDb.id, concreted:0}, include:[{association: "users"}]})

            res.render('finish', {user: req.session.userLogged, carts, userDb});
        }catch(err){
            res.send('Internal Server Error 34: '+err + err.message)
        }
    },
    finishMessage: (req,res) => {
        res.render('finish');
    }
};

module.exports = cartsController;