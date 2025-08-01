const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth');

router.post('/login', authController.login);
router.post('/register', authController.register);
router.put('/reset-password', authController.resetPassword);
router.post('/logout', authController.logout);

module.exports = router;