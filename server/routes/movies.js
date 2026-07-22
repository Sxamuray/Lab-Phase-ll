const express = require('express');
const {
  getMovies,
  getTrending,
  getMovieById,
  viewMovie,
  rateMovie,
  getUserRating,
} = require('../controllers/movieController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/', getMovies);
router.get('/trending', getTrending);
router.get('/:id', getMovieById);
router.post('/:id/view', protect, viewMovie);
router.post('/:id/rate', protect, rateMovie);
router.get('/:id/my-rating', protect, getUserRating);

module.exports = router;
