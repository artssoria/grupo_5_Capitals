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
        tableName: "roles"
    }

    const Role = sequelize.define("Role", cols, config);

    Role.associate = function(models) {
        Role.hasMany(models.Users, {
            foreignKey: 'roles_id',
            as: 'users'
        })
    }

    return Role;
}