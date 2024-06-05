const { body } = require('express-validator');
const path = require('path');

let middleValidUpdateUser = [
    body('password1').notEmpty().withMessage('Escribe tu contraseña actual'),
    body('password2')
    .notEmpty().withMessage('Debes agregar una contraseña válida')
    .isLength({min: 8}).withMessage('La contraseña debe tener al menos 8 caracteres')
    .isStrongPassword({
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        minUppercase: 1,
        minLowercase: 1
    }).withMessage('La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un símbolo y un número'),
    body('password3').notEmpty().withMessage('Debes escribir tu nueva contraseña de vuelta')
    
]

module.exports = middleValidUpdateUser;