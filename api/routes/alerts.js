const express = require('express');
const router = express.Router();

const alerts = require('../controllers/alerts');

router.get('/', alerts.get);

module.exports = router;