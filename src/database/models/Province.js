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
        nationalities_id: {
            type: DataTypes.INTEGER,
            unique: false
        }
    };

    let config = {
        timestamps: false,
        tableName: "provinces"
    }

    const Province = sequelize.define("Province", cols, config);

    Province.associate = function(models) {
        Province.belongsTo(models.Nationalitie, {
            as: "nationalitie",
            foreignKey: "nationalities_id"
        })

        Province.hasMany(models.User, {
            foreignKey: 'provinces_id',
            as: 'users'
        })
    };

    return Province;
}