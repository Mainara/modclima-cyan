const express = require('express');
const harvestController = require('../controllers/harvestController');
const router = express.Router();

router.post("/", harvestController.addHarvest);
router.get("/", harvestController.getHarvests);
router.delete("/:id", harvestController.removeHarvest);

module.exports = router;
