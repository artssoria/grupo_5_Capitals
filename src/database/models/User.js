
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
        tableName: "users",
    }

    const User = sequelize.define("User", cols, config);

    User.associate = function(models) {
        User.belongsTo(models.Role, {
            foreignKey: 'roles_id',
            as: 'roles'
        })

        User.belongsTo(models.Nationalitie, {
            foreignKey: 'nationalities_id',
            as: 'nationalities'
        })
        
        User.belongsTo(models.Province, {
            foreignKey: 'provinces_id',
            as: 'provinces'
        })

        User.hasMany(models.Comentarie, {
            foreignKey: 'users_id',
            as: 'comentaries'
        })

        User.hasMany(models.Cart,{
            foreignKey: 'users_id',
            as: 'carts'
        })
    }

    return User;
}