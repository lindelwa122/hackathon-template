const express = require('express');
const router = express.Router();

const dashboardController = require('../controllers/auth');

router.get('/overall-points', dashboardController.overallPoints);
router.get('/discounts', dashboardController.discounts);
router.get('/places/low-risk', dashboardController.lowRisk);
router.get('/places/mid-risk', dashboardController.midRisk);
router.get('/places/high-risk', dashboardController.highRisk);
router.get('/current-warning', dashboardController.currentWarning);
router.get('/alerts/summarized', dashboardController.summarizedAlerts);

module.exports = router;