const db = require('../database/models');

async function middleAdmin(req,res,next){
    try{
        if(req.session.userLogged){
            let adminCheck = await db.User.findOne({where: {id: req.session.userLogged.id, roles_id:1}})
            if(adminCheck && adminCheck != undefined){
                next()
            }else{
                return res.redirect('/users/profile')
            }
        }else{
            return res.redirect('/users/login')
        }
    }catch(err){
        res.send('error servidor en middleAdmin: '+ err)
    }

}

module.exports = middleAdmin;