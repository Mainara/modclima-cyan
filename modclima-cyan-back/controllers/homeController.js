const { Fields, Farms, Harvests, Mills } = require('../app/models');
const Op = require('sequelize').Op

exports.filter = async function (req, res) {

    try {
        const fields = await filterHelper(req);
        res.status(200).json({ data: fields })
    } catch (error) {
        console.log('Error: ', error)
        res.status(500).json({ data: { message: 'Unexpected error retrieving fields' } })
    }
};

filterHelper = async function (req) {
    let { millName, startDate, endDate, harvestCode, farmName, farmCode, fieldCode } = req.query;

    if (millName != '') {
        millName = {
            name: { [Op.like]: `%${millName}%` }
        }
    }
    if (harvestCode != '') {
        harvestCode = { code: { [Op.like]: `%${harvestCode}%` } }
    }
    if (fieldCode != '') {
        fieldCode = { code: { [Op.like]: `%${fieldCode}%` } }
    }
    if (farmCode != '') {
        farmCode = { code: { [Op.like]: `%${farmCode}%` } }
    }
    if (farmName != '') {
        farmName = { name: { [Op.like]: `%${farmName}%` } }
    }
    if (startDate != '') {
        startDate = {
            startDate: {
                [Op.lte]: `${startDate}T00:00:00.000Z`
            }
        }
    }
    if (endDate != '') {
        endDate = {
            endDate: {
                [Op.gte]: `${endDate}T00:00:00.000Z`
            }
        }
    }

    let options = {
        where: fieldCode,
        include: [
            {
                model: Farms,
                as: 'farm',
                required: true,
                where: {
                    [Op.and]: [
                        farmName,
                        farmCode
                    ]
                },
                include: [
                    {
                        model: Harvests,
                        as: 'harvest',
                        required: true,
                        where: {
                            [Op.and]: [
                                harvestCode,
                                startDate,
                                endDate
                            ]
                        },
                        include: [
                            {
                                model: Mills,
                                as: 'mill',
                                where: millName,
                            }
                        ]
                    }
                ]
            }
        ]
    }
    const fields = await Fields.findAll(options);
    if (fields) {
        return fields;
    }
}