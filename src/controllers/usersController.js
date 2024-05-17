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
    login: (req, res) => {
        const error = req.query.error ? req.query.error : null;
        res.render('login', { error });
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

    userCreate: (req, res) => {
        let errors = validationResult(req);
        let emailPc = req.body.email;
        let emailCheck = db.User.findOne({where: {email: emailPc}})
        if (emailCheck != undefined){
            Promise.all([
                db.Nationalitie.findAll({ include: [{ association: "provinces" }] }),
                db.Province.findAll()
            ])
            .then(([nations, provinces]) => {
                return res.render('register', {errors: {email:{msg:'Este email ya ha sido registrado'}}, old:req.body, nations, provinces });
            })
        }

        if (errors.isEmpty()){
            
            db.User.create({
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
            .then(function(user){
                return res.redirect('/')
            })
        }else{
            Promise.all([
                db.Nationalitie.findAll({ include: [{ association: "provinces" }] }),
                db.Province.findAll()
            ])
            .then(([nations, provinces]) => {
                return res.render('register', {errors: errors.array(), old:req.body, nations, provinces });
            })
        }

    },

    cargaUsuario: (req, res) => {
        const { firstName, lastName, email, password, phone, nationality, province } = req.body;
        if (!firstName || !lastName || !email || !password || !phone || !nationality || !province) {
            res.status(400).send('Campos incompletos');
            return;
        }
        const usuariosCompletos = leerUsuarios();

        let newUsuario = {
            id: usuariosCompletos.length + 1,
            Nombre: firstName,
            Apellido: lastName,
            Email: email,
            Contraseña: password,
            Telefono: phone,
            Nacionalidad: nationality,
            Provincia: province,
            tipoUsuario: 'user'
        };
        usuariosCompletos.push(newUsuario);

        fs.writeFile(usersFilePath, JSON.stringify(usuariosCompletos, null, 2), (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error al guardar los datos');
                return;
            }
            res.redirect('/');
        });
    },

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
    }
};

module.exports = userControllers;