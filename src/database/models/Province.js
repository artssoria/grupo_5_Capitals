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
        Province.belongsTo(models.Nationalities, {
            as: "nationalitie",
            foreignKey: "nationalities_id"
        });
    };

    return Province;
}