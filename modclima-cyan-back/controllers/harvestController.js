const { Harvests, Mills, Farms } = require('../app/models');

exports.addHarvest = async function (req, res) {
    try {
        const result = await Harvests.create(req.body);
        res.status(201).json({ data: { msg: "Harvest with id: " + result.id + " created!" } });
    } catch (error) {
        console.log('Error: ', error)
        res.status(500).json({ data: { msg: 'Error creating a harvest' } })
    }
}

exports.getHarvests = async function (req, res) {
    try {
        const harvests = await Harvests.findAll({ 
            where: req.query,
            include: [{
                model: Mills,
                as: 'mill'
            },
            {
                model: Farms,
                as: 'farms'
            }]
         });
        res.status(200).json({ data: harvests })
    } catch (error) {
        console.log('Error: ', error)
        res.status(500).json({ data: { message: 'Error retrieving harvests' } })
    }
}


exports.removeHarvest = async function (req, res) {
    try {
        const harvest = await Harvests.findOne({
            where: {
                id: req.params.id
            }, include: [
                {
                    model: Farms,
                    as: 'farms'
                }]
        });
        if(harvest.farms.length > 0 && harvest) {
            res.status(500).json({ data: { message: 'Cannot remove harvest with associated farms' } })
        } else if (harvest) {
            await harvest.destroy();
            res.status(204).send();
        } else {
            res.status(400).json({ data: { message: 'Harvest not found' } })
        }

    } catch (error) {
        console.log('Error: ', error)
        res.status(500).json({ data: { message: 'Error removing a harvest' } })
    }
};