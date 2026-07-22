const Activity = require('../models/Activity');

exports.getRecentActivity = async (_req, res) => {
  try {
    const activities = await Activity.find()
      .sort({ createdAt: -1 })
      .limit(30)
      .populate('user', 'username')
      .populate('movie', 'title universe poster');

    res.json(activities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAnalytics = async (_req, res) => {
  try {
    const [viewed, rated, watchlist] = await Promise.all([
      Activity.countDocuments({ type: 'movie.viewed' }),
      Activity.countDocuments({ type: 'movie.rated' }),
      Activity.countDocuments({ type: 'watchlist.updated' }),
    ]);

    res.json({ viewed, rated, watchlist, total: viewed + rated + watchlist });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
