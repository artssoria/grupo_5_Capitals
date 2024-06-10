const fs = require('fs');
const path = require('path');
const { verificarCredenciales } = require('../auth/auth');
let db = require("../database/models");
const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const { hashSync } = require('bcrypt');

const usersFilePath = path.join(__dirname, '../data/users.json');

if (!fs.existsSync(usersFilePath)) {
    fs.writeFileSync(usersFilePath, '[]', 'utf-8');
}

const leerUsuarios = () => {
    try {
        const data = fs.readFileSync(usersFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error al leer los usuarios:', error);
        return [];
    }
};

const userControllers = {
    loginRender: (req, res) => {
        // const error = req.query.error ? req.query.error : null;
        res.render('login');
    },

    registerRender: (req, res) => {
        Promise.all([
            db.Nationalitie.findAll({ include: [{ association: "provinces" }] }),
            db.Province.findAll()
        ])
        .then(([nations, provinces]) => {
            return res.render('register', { nations, provinces });
        })
        .catch(err => {
            console.error("Error fetching data:", err);
            res.status(500).send("Internal server error");
        });
    },

    listado: (req, res) => {
        const usuarios = leerUsuarios();
        res.render('usuarios', { usuarios });
    },

    userCreate: async (req, res) => {
        let resultValidation = validationResult(req);
        let emailPc = req.body.email;
        try {
            let emailCheck = await db.User.findOne({where: {email: emailPc}});
            if (emailCheck){
                let [nations, provinces] = await Promise.all([
                    db.Nationalitie.findAll({ include: [{ association: "provinces" }] }),
                    db.Province.findAll()
                ])
                return res.render('register', {errors: {email:{msg:"Este email ya ha sido registrado"}}, old:req.body, nations, provinces });
            }else{
                if (resultValidation.errors.length == 0){
                
                    await db.User.create({
                        first_name: req.body.firstName,
                        last_name: req.body.lastName,
                        profile_img: "/images/usuario_defecto.png",
                        email: req.body.email,
                        password: bcryptjs.hashSync(req.body.password, 10),
                        phone: req.body.phone,
                        nationalities_id: req.body.nationality,
                        provinces_id: req.body.province,
                        roles_id: 2
                    })
                    return res.redirect('/')
                }else{
                    let [nations, provinces] = await Promise.all([
                        db.Nationalitie.findAll({ include: [{ association: "provinces" }] }),
                        db.Province.findAll()
                    ])
                    return res.render('register', {errors: resultValidation.mapped(), old:req.body, nations, provinces });
                }
            }
        }catch (error){
            console.error(error);
            return res.status(500).send("Internal Server Error");
        }
    },
    // controlador para cargar usuarios en JSON
    // cargaUsuario: (req, res) => {
    //     const { firstName, lastName, email, password, phone, nationality, province } = req.body;
    //     if (!firstName || !lastName || !email || !password || !phone || !nationality || !province) {
    //         res.status(400).send('Campos incompletos');
    //         return;
    //     }
    //     const usuariosCompletos = leerUsuarios();

    //     let newUsuario = {
    //         id: usuariosCompletos.length + 1,
    //         Nombre: firstName,
    //         Apellido: lastName,
    //         Email: email,
    //         Contraseña: password,
    //         Telefono: phone,
    //         Nacionalidad: nationality,
    //         Provincia: province,
    //         tipoUsuario: 'user'
    //     };
    //     usuariosCompletos.push(newUsuario);

    //     fs.writeFile(usersFilePath, JSON.stringify(usuariosCompletos, null, 2), (err) => {
    //         if (err) {
    //             console.error(err);
    //             res.status(500).send('Error al guardar los datos');
    //             return;
    //         }
    //         res.redirect('/');
    //     });
    // },

    // handleLogin: (req, res) => {
    //     const { email, password } = req.body;
    //     if (!email || !password) {
    //         return res.redirect('/users/login?error=Correo electrónico y contraseña son requeridos');
    //     }

    //     // Buscar el usuario por su correo electrónico en la base de datos
    //     const usuario = leerUsuarios().find(user => user.Email === email);

    //     if (!usuario) {
    //         return res.redirect('/users/login?error=Usuario no encontrado');
    //     }

    //     // Verificar el tipo de usuario y redirigir a la ruta correspondiente
    //     if (usuario.tipoUsuario === 'admin') {
    //         res.redirect('/admin/panel'); // Redirige a la página del panel de administrador
    //     } else if (usuario.tipoUsuario === 'user') {
    //         res.redirect('/producto/listado-productos'); // Redirige a la página de listado de productos para usuarios normales
    //     } else {
    //         res.redirect('/users/login?error=Tipo de usuario no válido');
    //     }
    // },
    loginProcess: async (req,res) =>{
        try{
            let userToLogin = await db.User.findOne({where:{email:req.body.email}})
            if(userToLogin){
                let passwordIsOk = bcryptjs.compareSync(req.body.password, userToLogin.password);
                if(passwordIsOk){
                    delete userToLogin.password;
                    req.session.userLogged = userToLogin;
                    if(req.body.rememberUser){
                        res.cookie('userEmail', req.body.email, {maxAge: (1000 * 60)*240})
                    }
                    res.redirect('/users/profile');
                }else{
                    res.render('login', {errors: {password:{msg:"La información suministrada es incorrecta"}}})
                }
            }else{
                res.render('login', {errors: {email:{msg:"El mail ingresado no coincide con nuestra base de datos"}}})
            }
        }catch (error){
            console.error(error);
            return res.status(500).send("Internal Server Error");
        }
    },
    profileRender: async (req,res) =>{
        try{
            let userDb = await db.User.findOne({where:{email:req.session.userLogged.email}, include: [{ association: "nationalities" }, { association: "provinces" }, { association: "roles" }]});
            let cartsVerify = await db.Cart.findAll({where: {users_id: userDb.id}, include:[{association: "users"}]});
            if(cartsVerify.length == 0){
                await db.Cart.create({
                    concreted: 0,
                    total_price: 0,
                    amount_elements: 0,
                    users_id: userDb.id
                });
                let carts = await db.Cart.findOne({where: {users_id: userDb.id}, include:[{association: "users"}]});
                res.render('profileUser', {
                    user: req.session.userLogged,
                    userDb,
                    carts
                })
            }else{
                let cartsUser = await db.Cart.findOne({where: {users_id: userDb.id, concreted: 0}});
                if(cartsUser.length == 0){
                    await db.Cart.create({
                        concreted: 0,
                        total_price: 0,
                        amount_elements: 0,
                        users_id: userDb.id
                    });
                    let carts = await db.Cart.findOne({where: {users_id: userDb.id, concreted:0}, include:[{association: "users"}]});
                    res.render('profileUser', {
                        user: req.session.userLogged,
                        userDb,
                        carts
                    })
                }else{
                    let carts = await db.Cart.findOne({where: {users_id: userDb.id, concreted:0}, include:[{association: "users"}]})
                    res.render('profileUser', {
                        user: req.session.userLogged,
                        userDb,
                        carts
                    })
                }
            }
        }catch(error){
            console.error(error);
            return res.status(500).send("Internal Server Error");
        }
    },
    logOut: (req,res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        res.redirect('/')
    },

    modifProfileRender: async (req,res) => {
        try{
            let userDb = await db.User.findOne({where:{email:req.session.userLogged.email}, include: [{ association: "nationalities" }, { association: "provinces" }, { association: "roles" }]});
            let [nations, provincies] = await Promise.all([
                db.Nationalitie.findAll({ include: [{ association: "provinces" }] }),
                db.Province.findAll()
            ]);
            res.render('modifProfile', {user: req.session.userLogged, userDb, nations, provincies})
        }catch(error){
            return res.status(500).send("Internal Server Error");
        }
        
    },
    updateUser: async(req,res) =>{
        let resultValidation = validationResult(req);
        try{
            if(resultValidation.errors.length > 0){
                let userDb = await db.User.findOne({where:{email:req.session.userLogged.email}, include: [{ association: "nationalities" }, { association: "provinces" }, { association: "roles" }]});
                let [nations, provincies] = await Promise.all([
                    db.Nationalitie.findAll({ include: [{ association: "provinces" }] }),
                    db.Province.findAll()
                ]);
                return res.render('modifProfile', {errors: resultValidation.mapped(), old: req.body, userDb, nations, provincies})
            }else{
                let userMod = {...req.body};
                if (req.file) {
                    let imageFin = req.file.filename;
                    userMod['profile_img'] = '/images/' + imageFin;
                } else {
                    let userFind = await db.User.findByPk(req.params.idUser);
                    userMod['profile_img'] = userFind.profile_img;
                };
                await db.User.update(userMod,     
                {where:{id:req.params.idUser}});
                res.redirect('/')
            }
        }catch(err){
            return res.status(500).send("Internal Server Error " + err);
        }
    },
    modifPassRender: async (req,res) => {
        try{
            let userDb = await db.User.findByPk(req.params.idUser);
            res.render('profilePass', {userDb});
        }catch(err){
            res.send('Hubo un problema con el servidor: ' +err)
        }

    },
    updatePass: async (req,res) => {
        let pass1 = req.body.password1;
        let pass2 = req.body.password2;
        let pass3 = req.body.password3;
        try{
            let userToCompare = await db.User.findByPk(req.params.idUser);
            let resultValidation = validationResult(req);
            let passIsOk = bcryptjs.compareSync(pass1, userToCompare.password);
            if(passIsOk){
                if(resultValidation.errors.length > 0){
                    let userDb = await db.User.findByPk(req.params.idUser);
                    res.render('profilePass', {errors: resultValidation.mapped(), userDb});
                }else{
                    if(pass2 == pass3){
                        let changePass = hashSync(pass2, 10);
                        await db.User.update(
                            {password: changePass},
                            {where: {id:req.params.idUser}}
                        )
                        return res.redirect('/');
                    }else{
                        let userDb = await db.User.findByPk(req.params.idUser);
                        return res.render('profilePass', {errors: resultValidation.mapped(), errors:{password2:{msg:"Debes volver a tipear tu nueva contraseña y ambas deben coincidir"}}, userDb})
                    }
                }
            }else{
                let userDb = await db.User.findByPk(req.params.idUser);
                return res.render('profilePass', {errors: resultValidation.mapped(), errors:{password1: {msg:"No coincide la contraseña ingresada"}}, userDb})
            }
        }catch(err){
            res.send('Error con: '+ err)
        }
        
    },
    getHistory: async(req,res) =>{
        try{
            let userDb = await db.User.findOne({where:{email:req.session.userLogged.email}});
            let history = await db.Cart.findAll({where: {users_id:userDb.id, concreted: 1}});
            if(history){
                return res.render('history', {history, userDb})
            }else{
                return res.render('history', {userDb})
            }
        }catch(err){
            res.send('Error de servidor 16'+err)
        }
    }
};

module.exports = userControllers;