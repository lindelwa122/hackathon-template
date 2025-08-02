const express = require('express');
const router = express.Router();

const badgesController = require('../controllers/badges');

router.get('/all', badgesController.all);
router.get('/acquired', badgesContr  oller.acquired);
router.get('/current', badgesController.current);

module.exports = router;