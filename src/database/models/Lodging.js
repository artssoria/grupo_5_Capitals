module.exports = (sequelize, DataTypes) => {
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true
        },
        name: {
            type: DataTypes.TEXT,
            unique: false
        },
        description: {
            type: DataTypes.TEXT,
            unique:false
        }
    };

    let config = {
        timestamps: false,
        tableName: "lodgings"
    }

    const Lodging = sequelize.define("Lodging", cols, config);

    Lodging.associate = function(models) {
        Lodging.hasMany(models.Products, {
            foreignKey: 'lodgings_id',
            as: 'products'
        })
    };
    

    return Lodging;
}