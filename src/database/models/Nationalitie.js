
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
        }
    };

    let config = {
        timestamps: false,
        tableName: "nationalities"
    }

    const Nationalitie = sequelize.define("Nationalitie", cols, config);

    Nationalitie.associate = function(models) {
        Nationalitie.hasMany(models.Province, {
            as: "province",
            foreignKey: "nationalities_id"
        })

        Nationalitie.hasMany(models.User, {
            foreignKey: 'nationalities_id',
            as: 'users'
        })
    };

    return Nationalitie;
}