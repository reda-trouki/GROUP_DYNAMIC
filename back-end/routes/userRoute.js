const express = require('express');
const { login,register } = require('../controllers/userController');

const router = express.Router();

router.post('/auth/signUp', register);
router.post('/auth/login',login);



module.exports = router;