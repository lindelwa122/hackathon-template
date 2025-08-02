const express = require('express');
const router = express.Router();

const areasController = require('../controllers/areas');

// router.post('/save', areasController.save);
router.get('/get-home', areasController.getHome);
router.get('/get-work', areasController.getWork);
router.get('/get-frequented-place', areasController.getFrequentedPlace);

module.exports = router;