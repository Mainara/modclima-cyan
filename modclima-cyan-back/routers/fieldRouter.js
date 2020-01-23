const express = require('express');
const fieldController = require('../controllers/fieldController');
const router = express.Router();

router.post("/", fieldController.addField);
router.get("/", fieldController.getFields);

module.exports = router;
