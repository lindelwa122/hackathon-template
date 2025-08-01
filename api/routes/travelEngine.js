const express = require('express');
const router = express.Router();

const travelEngineController = require('../controllers/auth');

router.get('/prediction', travelEngineController.overallPoints);
router.get('/historical-data', travelEngineController.discounts);

module.exports = router;