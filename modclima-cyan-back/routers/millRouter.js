const express = require('express');
const millController = require('../controllers/millController');
const router = express.Router();

router.post("/", millController.addMill);
router.get("/", millController.getMills);
router.delete("/:id", millController.removeMill);

module.exports = router;
