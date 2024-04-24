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
        tableName: "services"
    }

    const Service = sequelize.define("Service", cols, config);

    Service.associate = function(models) {
        Service.hasMany(models.Product, {
            foreignKey: 'services_id',
            as: 'products'
        })
    };

    return Service;
}