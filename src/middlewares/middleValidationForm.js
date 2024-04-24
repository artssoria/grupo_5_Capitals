
const { body } = require('express-validator');

let middleValidationForm= [
    body('nombre_product').notEmpty().withMessage('Debes agregar el nombre del producto'),
    body('descripcion').notEmpty().withMessage('Debes agregar alguna descripcion'),
    body('servicio_product').notEmpty().withMessage('Debes seleccionar un servicio'),
    body('hospedaje_product').notEmpty().withMessage('Debes seleccionar un hospedaje'),
    body('precio_product').notEmpty().withMessage('Debes agregar el precio'),
    body('region_product').notEmpty().withMessage('Debes seleccionar la region')
]

module.exports = middleValidationForm;