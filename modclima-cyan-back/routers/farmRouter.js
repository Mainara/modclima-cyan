const express = require('express');
const farmController = require('../controllers/farmController');
const router = express.Router();

router.post("/", farmController.addFarm);
router.get("/", farmController.getFarms);

module.exports = router;
