
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
        Nationalitie.hasMany(models.Provinces, {
            as: "province",
            foreignKey: "nationalities_id"
        });
    };

    return Nationalitie;
}