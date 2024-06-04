const fs = require('fs');
const path = require('path');
const { verificarCredenciales } = require('../auth/auth');
let db = require("../database/models");
const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');

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

    handleLogin: (req, res) => {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.redirect('/users/login?error=Correo electrónico y contraseña son requeridos');
        }

        // Buscar el usuario por su correo electrónico en la base de datos
        const usuario = leerUsuarios().find(user => user.Email === email);

        if (!usuario) {
            return res.redirect('/users/login?error=Usuario no encontrado');
        }

        // Verificar el tipo de usuario y redirigir a la ruta correspondiente
        if (usuario.tipoUsuario === 'admin') {
            res.redirect('/admin/panel'); // Redirige a la página del panel de administrador
        } else if (usuario.tipoUsuario === 'user') {
            res.redirect('/producto/listado-productos'); // Redirige a la página de listado de productos para usuarios normales
        } else {
            res.redirect('/users/login?error=Tipo de usuario no válido');
        }
    },
    loginProcess: async (req,res) =>{
        try{
            let userToLogin = await db.User.findOne({where:{email:req.body.email}})
            if(userToLogin){
                let passwordIsOk = bcryptjs.compareSync(req.body.password, userToLogin.password);
                if(passwordIsOk){
                    delete userToLogin.password;
                    req.session.userLogged = userToLogin;
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
            res.render('profileUser', {
                user: req.session.userLogged,
                userDb
            })
        }catch(error){
            console.error(error);
            return res.status(500).send("Internal Server Error");
        }
    },
    logOut: (req,res) => {
        req.session.destroy();
        res.redirect('/')
    }
};

module.exports = userControllers;