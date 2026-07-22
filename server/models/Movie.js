const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    universe: { type: String, enum: ['Marvel', 'DC'], required: true },
    year: { type: Number, required: true },
    director: { type: String, default: '' },
    description: { type: String, default: '' },
    poster: { type: String, default: '' },
    avgRating: { type: Number, default: 0, min: 0, max: 10 },
    ratingCount: { type: Number, default: 0 },
    viewCount: { type: Number, default: 0 },
    trendingScore: { type: Number, default: 0 },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

movieSchema.index({ universe: 1, trendingScore: -1 });
movieSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('Movie', movieSchema);
