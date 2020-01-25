const express = require('express');
const farmController = require('../controllers/farmController');
const router = express.Router();

router.post("/", farmController.addFarm);
router.get("/", farmController.getFarms);
router.delete("/:id", farmController.removeFarm);

module.exports = router;
