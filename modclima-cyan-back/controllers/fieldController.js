const { Fields, Farms } = require('../app/models');

exports.addField = async function (req, res) {
    try {
        const result = await Fields.create(req.body);
        res.status(201).json({ data: { message: "Field with id: " + result.id + " created!" } });
    } catch (error) {
        console.log('Error: ', error)
        res.status(500).json({ data: { message: 'Error creating a farm' } })
    }
}

exports.getFields = async function (req, res) {
    try {
        const fields = await Fields.findAll({ where: req.query,
            include: [{
                model: Farms,
                as: 'farm'}
            ] });
        res.status(200).json({ data: fields })
    } catch (error) {
        console.log('Error: ', error)
        res.status(500).json({ data: { message: 'Error retrieving fields' } })
    }
}

exports.removeField = async function (req, res) {
    try {
        const field = await Fields.findOne({
            where: {
                id: req.params.id
            },
        });
        if (field) {
            await field.destroy();
        } else {
            res.status(400).json({ data: { message: 'Field not found' } })
        }
        res.status(204).send()
    } catch (error) {
        console.log('Error: ', error)
        res.status(500).json({ data: { message: 'Error removing a field' } })
    }
};