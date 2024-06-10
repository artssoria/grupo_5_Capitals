const { body } = require('express-validator');
const path = require('path');

let middleValidUpdateUser = [
    body('first_name').notEmpty().withMessage('Debes agregar un nombre').bail()
    .isLength({ min: 3, max: 13 }).withMessage('El nombre debe tener entre 3 y 13 caracteres.'),
    body('last_name').notEmpty().withMessage('Debes agregar un apellido').bail()
    .isLength({ min: 3, max: 13 }).withMessage('El apellido debe tener entre 3 y 13 caracteres.'),
    body('email').notEmpty().withMessage('Debes agregar un mail').bail()
    .isEmail().withMessage('Debes agregar un mail válido'),
    body('phone').notEmpty().withMessage('Debes agregar un teléfono'),
    body('profile_img').custom((value, {req})=>{
        let file = req.file;
        let acceptedExtensions= ['.jpg', '.jpeg', '.png', '.gif'];

        if(file) {
            let fileExtension = path.extname(file.originalname);
            if(!acceptedExtensions.includes(fileExtension)){
                throw new Error('Las extensiones de archivo permitidas son '+ acceptedExtensions.join(', '))
            }
        }

        return true;
    })
]

module.exports = middleValidUpdateUser;