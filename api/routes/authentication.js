const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth');

router.get('/login', authController.login);
router.get('/register', authController.register);
router.get('/reset-password', authController.resetPassword);
router.get('/logout', authController.logout);

module.exports = router;