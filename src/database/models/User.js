module.exports = (sequelize, DataTypes) => {
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },
        first_name: {
            type: DataTypes.TEXT,
            unique: false
        },
        last_name: {
            type: DataTypes.TEXT,
            unique: false
        },
        email: {
            type: DataTypes.TEXT,
            unique: false
        },
        password: {
            type: DataTypes.TEXT,
            unique: false
        },
        phone: {
            type: DataTypes.TEXT,
            unique: false
        },
        profile_img: {
            type: DataTypes.TEXT,
            unique: false
        },
        nationalities_id: {
            type: DataTypes.INTEGER,
            unique: false
        },
        provinces_id: {
            type: DataTypes.INTEGER,
            unique: false
        },
        roles_id: {
            type: DataTypes.INTEGER,
            unique: false
        }
    };

    let config = {
        timestamps: false,
        tableName: "users"
    }

    const User = sequelize.define("User", cols, config);

    return User;
}