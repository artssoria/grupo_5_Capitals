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
            types: DataTypes.INTEGER,
            unique: false
        }
    };

    let config = {
        timestamps: false,
        tableName: "products"
    }

    const Product = sequelize.define("Product", cols, config);

    return Product;
}