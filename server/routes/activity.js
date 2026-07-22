const express = require('express');
const { getRecentActivity, getAnalytics } = require('../controllers/activityController');

const router = express.Router();

router.get('/', getRecentActivity);
router.get('/analytics', getAnalytics);

module.exports = router;
