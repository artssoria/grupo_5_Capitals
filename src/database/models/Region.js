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
        tableName: "regions"
    }

    const Region = sequelize.define("Region", cols, config);

    return Region;
}