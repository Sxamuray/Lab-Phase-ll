require('dotenv').config({ path: './config.env' });
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');

const authRoutes = require('./routes/auth');
const movieRoutes = require('./routes/movies');
const watchlistRoutes = require('./routes/watchlist');
const activityRoutes = require('./routes/activity');
const { startConsumer } = require('./services/kafkaConsumer');
const { seedIfEmpty } = require('./data/seedMovies');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }));
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', app: 'HeroStream API' });
});

app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/watchlist', watchlistRoutes);
app.use('/api/activity', activityRoutes);

connectDB()
  .then(async () => {
    await seedIfEmpty();
    startConsumer();
    app.listen(PORT, () => console.log(`HeroStream API running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  });
