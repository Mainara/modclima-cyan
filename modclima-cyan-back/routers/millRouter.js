const express = require('express');
const millController = require('../controllers/millController');
const router = express.Router();

router.post("/", millController.addMill);
router.get("/", millController.getMills);

module.exports = router;
