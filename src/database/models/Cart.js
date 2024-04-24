const Users = require('../models/User.js');
module.exports = (sequelize, DataTypes) => {
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },
        total_price: {
            type: DataTypes.DECIMAL(40,2),
            unique: false
        },
        amount_elements: {
            type: DataTypes.INTEGER,
            unique: false
        },
        concreted: {
            type: DataTypes.BOOLEAN,
            unique: false
        },
        users_id: {
            type: DataTypes.INTEGER,
            unique: false
        }
    };

    let config = {
        timestamps: false,
        tableName: "carts"
    };

    const Cart = sequelize.define("Cart", cols, config);

    Cart.associate = function (models) {
        Cart.belongsTo(models.User , {
            foreignKey: 'users_id',
            as: 'users'

        });

        Cart.belongsToMany(models.Product, {
            as: 'products',
            through: 'products_carts',
            foreignKey: 'carts_id',
            otherKey: 'products_id',
            timestamps: false
        })
    }

    return Cart;
}