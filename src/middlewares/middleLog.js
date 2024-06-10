const db = require('../database/models');

async function middleLog(req, res, next) {
    res.locals.isLogged = false;

    try {
        let emailInCookie = req.cookies.userEmail;
        if (emailInCookie) {
            let userFromCookie = await db.User.findOne({ where: { email: emailInCookie } });
            if (userFromCookie) {
                req.session.userLogged = userFromCookie;
            } else {
                req.session.userLogged = undefined;
            }
        }

        if (req.session && req.session.userLogged && req.session.userLogged != undefined) {

            res.locals.isLogged = true;
            res.locals.userLogged = req.session.userLogged;
            let cartsF = await db.Cart.findOne({where: {users_id: res.locals.userLogged.id, concreted: 0}});
            res.locals.carts = cartsF || {};
            
        }
        
        next(); // Llamar a next() solo después de que se complete la lógica asincrónica
    } catch (err) {
        res.status(500).send('Error interno de servidor');
    }
}

module.exports = middleLog;