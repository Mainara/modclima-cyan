module.exports = (sequelize, DataTypes) => {
    const Farms = sequelize.define(
        'Farms',
        {
            code: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            name: {
                allowNull: false,
                type: DataTypes.STRING
            }
        },
        {
            paranoid: true
        },
    );

    Farms.associate = (models) => {
        Farms.hasMany(models.Fields, {
            as: 'fields',
            foreignKey: {
                name: 'farmId',
            },
        });

        Farms.belongsTo(models.Harvests, {
            as: 'harvest',
            foreignKey: {
                name: 'harvestId',
            }
        });
    };

    return Farms;
};