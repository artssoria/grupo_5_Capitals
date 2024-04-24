module.exports = (sequelize, DataTypes) => {
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },
        description: {
            type: DataTypes.TEXT,
            unique: false
        },
        title: {
            type: DataTypes.TEXT,
            unique: false
        },
        score: {
            type: DataTypes.INTEGER,
            unique: false
        },
        products_id: {
            type: DataTypes.INTEGER,
            unique: false
        },
        users_id: {
            type: DataTypes.INTEGER,
            unique: false
        }
    };

    let config = {
        timestamps: false,
        tableName: "comentaries"
    }

    const Comentarie = sequelize.define("Comentarie", cols, config);

    Comentarie.associate = function (models) {
        Comentarie.belongsTo(models.Product, {
            foreignKey: 'products_id',
            as: 'products'
        })

        Comentarie.belongsTo(models.User, {
            foreignKey: 'users_id',
            as: 'users'
        })
    }

    return Comentarie;
}