const express = require('express');
const router = express.Router();
const { getCompletedElements, getInprogressElements, getElementById } = require('../controllers/elementController');

router.get('/elements/completed', getCompletedElements);
router.get('/elements/inProgress', getInprogressElements);
router.get('/elements/:id', getElementById);

module.exports = router;