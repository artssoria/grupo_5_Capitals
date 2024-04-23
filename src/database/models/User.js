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
        User.belongsTo(models.Roles, {
            foreignKey: 'roles_id',
            as: 'roles'
        })

        User.belongsTo(models.Nationalities, {
            foreignKey: 'nationalities_id',
            as: 'nationalities'
        })
        
        User.belongsTo(models.Provinces, {
            foreignKey: 'provinces_id',
            as: 'provinces'
        })

        User.hasMany(models.Comentaries, {
            foreignKey: 'users_id',
            as: 'comentaries'
        })

        User.hasMany(models.Carts,{
            foreignKey: 'users_id',
            as: 'carts'
        })
    }

    return User;
}