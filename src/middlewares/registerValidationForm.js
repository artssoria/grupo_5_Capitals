const { body } = require('express-validator');

let registerValidationForm= [
    body('firstName').notEmpty().withMessage('Debes agregar un nombre válido'),
    body('lastName').notEmpty().withMessage('Debes agregar un apellido válido'),
    body('email').notEmpty().withMessage('Debes agregar un email').bail()
    .isEmail().withMessage('Debes agregar un email válido'),
    body('password')
        .notEmpty().withMessage('Debes agregar una contraseña válida')
        .isLength({min: 8}).withMessage('La contraseña debe tener al menos 8 caracteres')
        .isStrongPassword({
            minLowercase: 1,
            minNumbers: 1,
            minSymbols: 1,
            minUppercase: 1,
            minLowercase: 1
        }).withMessage('La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un símbolo y un número'),
    body('phone').notEmpty().withMessage('Debes agregar un teléfono válido'),
    body('terms').notEmpty().withMessage('Debes aceptar los términos y condiciones')
]

module.exports = registerValidationForm;