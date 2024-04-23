module.exports = (sequelize, DataTypes) => {
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },
        amount_products: {
            type: DataTypes.INTEGER,
            unique: false
        },
        carts_id: {
            type: DataTypes.INTEGER,
            unique: false
        },
        products_id: {
            type: DataTypes.INTEGER,
            unique: false
        }
    };

    let config = {
        timestamps: false,
        tableName: "products_carts"
    }

    const ProductCart = sequelize.define("ProductCart", cols, config);

    ProductCart.associate = function(models) {
        ProductCart.belongsTo(models.Products, {
            foreignKey: 'products_id',
            as: 'products'
        })

        ProductCart.belongsTo(models.Carts, {
            foreignKey: 'carts_id',
            as: 'carts'
        })
        
    }

    return ProductCart;
}