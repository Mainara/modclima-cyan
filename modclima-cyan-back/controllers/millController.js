const { Mills, Harvests } = require('../app/models');

exports.addMill = async function (req, res) {
    try {
        const result = await Mills.create(req.body);
        res.status(201).json({ data: { msg: "Mill with id: " + result.id + " created!" } });
    } catch (error) {
        console.log('Error: ', error);
        res.status(500).json({ data: { msg: 'Error creating a mill' } })
    }
}

exports.getMills = async function (req, res) {
    try {
        const mills = await Mills.findAll({
            where: req.query
        });
        res.status(200).json({ data: mills })
    } catch (error) {
        console.log('Error: ', error)
        res.status(500).json({ data: { message: 'Error retrieving mills'} })
    }
}

exports.removeMill = async function (req, res) {
    try {
        const mill = await Mills.findOne({
            where: {
                id: req.params.id
            }, include: [{
                model: Harvests,
                as: 'harvests'
            }]

        });
        if(mill && mill.harvests.length > 0) {
            res.status(500).json({ data: { message: 'Cannot remove mill with associated harvests' } })
        } else if (mill) {
            await mill.destroy();
            res.status(204).send();
        } else {
            res.status(400).json({ data: { message: 'Mill not found' } })
        }

    } catch (error) {
        console.log('Error: ', error);
        res.status(500).json({ data: { message: 'Error removing a mill' } })
    }
};