const express = require('express');
const harvestController = require('../controllers/harvestController');
const router = express.Router();

router.post("/", harvestController.addHarvest);
router.get("/", harvestController.getHarvests);

module.exports = router;
