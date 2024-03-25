// auth.js
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/users.json');

const verificarCredenciales = (email, password, tipoUsuario) => {
    const usuarios = leerUsuarios();
    console.log('Usuarios encontrados en el archivo:', usuarios);

    // Encuentra el usuario por su email y tipo de usuario
    const usuario = usuarios.find(user => user.Email === email && user.tipoUsuario === tipoUsuario);

    if (usuario) {
        // Usuario encontrado, comprobemos la contraseña
        const passwordMatch = bcrypt.compareSync(password, usuario['Contraseña']);
        console.log('¿Las contraseñas coinciden?', passwordMatch);
        return passwordMatch;
    } else {
        // Usuario no encontrado
        console.log('Usuario no encontrado');
        return false;
    }
};


const leerUsuarios = () => {
    try {
        const data = fs.readFileSync(usersFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error al leer los usuarios:', error);
        return [];
    }
};

module.exports = { verificarCredenciales };
