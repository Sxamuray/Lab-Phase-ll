const Movie = require('../models/Movie');
const UserRating = require('../models/UserRating');
const { publishEvent } = require('../services/kafka');
const { TOPIC } = require('../services/kafkaConsumer');

exports.getMovies = async (req, res) => {
  try {
    const { universe, search, sort = 'trending' } = req.query;
    const filter = {};

    if (universe && ['Marvel', 'DC'].includes(universe)) filter.universe = universe;
    if (search) filter.$text = { $search: search };

    const sortMap = {
      trending: { trendingScore: -1 },
      rating: { avgRating: -1 },
      newest: { year: -1 },
      title: { title: 1 },
    };

    const movies = await Movie.find(filter).sort(sortMap[sort] || sortMap.trending);
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getTrending = async (_req, res) => {
  try {
    const movies = await Movie.find().sort({ trendingScore: -1 }).limit(10);
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.viewMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });

    const userId = req.user?._id;
    await publishEvent(TOPIC, {
      type: 'movie.viewed',
      userId,
      movieId: movie._id,
      metadata: { message: `${req.user?.username || 'Someone'} viewed ${movie.title}` },
    });

    res.json({ message: 'View recorded' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.rateMovie = async (req, res) => {
  try {
    const { rating } = req.body;
    const value = Number(rating);
    if (!value || value < 1 || value > 10) {
      return res.status(400).json({ message: 'Rating must be between 1 and 10' });
    }

    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });

    await UserRating.findOneAndUpdate(
      { user: req.user._id, movie: movie._id },
      { rating: value },
      { upsert: true, new: true }
    );

    await publishEvent(TOPIC, {
      type: 'movie.rated',
      userId: req.user._id,
      movieId: movie._id,
      metadata: {
        rating: value,
        message: `${req.user.username} rated ${movie.title} ${value}/10`,
      },
    });

    const updated = await Movie.findById(movie._id);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUserRating = async (req, res) => {
  try {
    const record = await UserRating.findOne({
      user: req.user._id,
      movie: req.params.id,
    });
    res.json({ rating: record?.rating ?? null });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
