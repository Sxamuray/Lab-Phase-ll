const Watchlist = require('../models/Watchlist');
const Movie = require('../models/Movie');
const { publishEvent } = require('../services/kafka');
const { TOPIC } = require('../services/kafkaConsumer');

exports.getWatchlist = async (req, res) => {
  try {
    let watchlist = await Watchlist.findOne({ user: req.user._id }).populate('movies');
    if (!watchlist) {
      watchlist = await Watchlist.create({ user: req.user._id, movies: [] });
    }
    res.json(watchlist.movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addToWatchlist = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.movieId);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });

    const watchlist = await Watchlist.findOneAndUpdate(
      { user: req.user._id },
      { $addToSet: { movies: movie._id } },
      { upsert: true, new: true }
    ).populate('movies');

    await publishEvent(TOPIC, {
      type: 'watchlist.updated',
      userId: req.user._id,
      movieId: movie._id,
      metadata: {
        action: 'add',
        message: `${req.user.username} added ${movie.title} to their watchlist`,
      },
    });

    res.json(watchlist.movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.removeFromWatchlist = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.movieId);

    const watchlist = await Watchlist.findOneAndUpdate(
      { user: req.user._id },
      { $pull: { movies: req.params.movieId } },
      { new: true }
    ).populate('movies');

    if (movie) {
      await publishEvent(TOPIC, {
        type: 'watchlist.updated',
        userId: req.user._id,
        movieId: movie._id,
        metadata: {
          action: 'remove',
          message: `${req.user.username} removed ${movie.title} from their watchlist`,
        },
      });
    }

    res.json(watchlist?.movies || []);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getWatchlistStats = async (req, res) => {
  try {
    const watchlist = await Watchlist.findOne({ user: req.user._id }).populate('movies');
    const movies = watchlist?.movies || [];

    const stats = {
      total: movies.length,
      marvel: movies.filter((m) => m.universe === 'Marvel').length,
      dc: movies.filter((m) => m.universe === 'DC').length,
    };

    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
