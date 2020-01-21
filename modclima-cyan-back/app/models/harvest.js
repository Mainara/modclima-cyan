module.exports = (sequelize, DataTypes) => {
    const Harvests = sequelize.define(
        'Harvests',
        {
            code: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            startDate: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            endDate: {
                allowNull: false,
                type: DataTypes.DATE,
            },
        },
        {
            paranoid: true
        },
    );

    Harvests.associate = (models) => {
        Harvests.hasMany(models.Farms, {
            as: 'farms',
            foreignKey: 'harvestId',
        });

        Harvests.belongsTo(models.Mills, {
            as: 'mill',
            foreignKey: {
                name: 'millId',
            }
        });
    };

    return Harvests;
};