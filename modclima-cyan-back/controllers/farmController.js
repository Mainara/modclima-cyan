const { Harvests, Fields, Farms } = require('../app/models');

exports.addFarm = async function (req, res) {
    try {
        const result = await Farms.create(req.body);
        res.status(201).json({ data: { message: "Farm with id: " + result.id + " created!" } });
    } catch (error) {
        console.log('Error: ', error)
        res.status(500).json({ data: { message: 'Error creating a farm' } })
    }
}

exports.getFarms = async function (req, res) {
    try {
        const farms = await Farms.findAll({
            where: req.query,
            include: [
                {
                    model: Harvests,
                    as: 'harvest'
                },
                {
                    model: Fields,
                    as: 'fields'
                }
            ]
        });
        res.status(200).json({ data: farms })
    } catch (error) {
        console.log('Error: ', error);
        res.status(500).json({ data: { message: 'Error retrieving farms' } })
    }
}

exports.removeFarm = async function (req, res) {
    try {
        const farm = await Farms.findOne({
            where: {
                id: req.params.id
            },include: [
                {
                    model: Fields,
                    as: 'fields'
                }
            ]
        });
        if(farm.fields.length > 0 && farm) {
            res.status(500).json({ data: { message: 'Cannot remove farm with associated fields' } })
        } else if (farm) {
            await farm.destroy();
        } else {
            res.status(400).json({ data: { message: 'Farm not found' } })
        }
        res.status(204).send()
    } catch (error) {
        console.log('Error: ', error)
        res.status(500).json({ data: { message: 'Error removing a farm' } })
    }
};