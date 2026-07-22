const express = require('express');
const {
  getWatchlist,
  addToWatchlist,
  removeFromWatchlist,
  getWatchlistStats,
} = require('../controllers/watchlistController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.get('/', getWatchlist);
router.get('/stats', getWatchlistStats);
router.post('/:movieId', addToWatchlist);
router.delete('/:movieId', removeFromWatchlist);

module.exports = router;
