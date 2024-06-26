module.exports = (sequelize, DataTypes) => {
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.TEXT,
            unique: false
        },
        description: {
            type: DataTypes.TEXT,
            unique: false
        },
        img: {
            type: DataTypes.TEXT,
            unique: false
        },
        price: {
            type: DataTypes.DECIMAL(40,2),
            unique: false
        },
        lodgings_id: {
            type: DataTypes.INTEGER,
            unique: false
        },
        services_id: {
            type: DataTypes.INTEGER,
            unique: false
        },
        regions_id: {
            type: DataTypes.INTEGER,
            unique: false
        }
    };

    let config = {
        timestamps: false,
        tableName: "products"
    };

    const Product = sequelize.define("Product", cols, config);

    Product.associate = function (models) {
        Product.belongsTo(models.Region, {
            foreignKey: 'regions_id',
            as: 'regions'
        })

        Product.belongsTo(models.Lodging, {
            foreignKey: 'lodgings_id',
            as: 'lodgings'
        })
        
        Product.belongsTo(models.Service, {
            foreignKey: 'services_id',
            as: 'services'
        })

        Product.hasMany(models.Comentarie, {
            foreignKey: 'products_id',
            as: 'comentaries'
        })

        Product.belongsToMany(models.Cart, {
            as: 'carts',
            through: 'products_carts',
            foreignKey: 'products_id',
            otherKey: 'carts_id',
            timestamps: false
        })
    }

    return Product;
}