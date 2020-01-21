module.exports = (sequelize, DataTypes) => {
    const Fields = sequelize.define(
        'Fields',
        {
            code: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            point: {
                allowNull: false,
                type: DataTypes.GEOMETRY('POINT')
            }
        },
        {
            paranoid: true
        },
    );

    Fields.associate = (models) => {
        Fields.belongsTo(models.Farms, {
            as: 'farm',
            foreignKey: {
                name: 'farmId',
            }
        });
    };

    return Fields;
};