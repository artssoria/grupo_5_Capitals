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
        tableName: "servicies"
    }

    const Service = sequelize.define("Service", cols, config);

    return Service;
}