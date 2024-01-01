const express = require('express');
const { login, register, getCompletedElementsOfUser, getIncompletedElementsOfUser } = require('../controllers/userController');
const verifyJWT = require('../middleware/verifyJWT');

const router = express.Router();

router.post('/auth/signUp', register);
router.post('/auth/login',login);
router.get('/elements/completed', verifyJWT, getCompletedElementsOfUser)
router.get('/elements/inProgress', verifyJWT, getIncompletedElementsOfUser)


module.exports = router;