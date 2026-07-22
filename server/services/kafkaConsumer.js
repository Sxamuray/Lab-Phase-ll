const Movie = require('../models/Movie');
const Activity = require('../models/Activity');
const { getKafka, enabled } = require('./kafka');

const TOPIC = 'herostream-events';

const scoreWeights = {
  'movie.viewed': 1,
  'movie.rated': 3,
  'watchlist.updated': 2,
};

async function handleEventLocally(event) {
  const { type, userId, movieId, metadata = {} } = event;

  if (movieId && scoreWeights[type]) {
    await Movie.findByIdAndUpdate(movieId, {
      $inc: {
        trendingScore: scoreWeights[type],
        ...(type === 'movie.viewed' ? { viewCount: 1 } : {}),
      },
    });
  }

  if (type === 'movie.rated' && movieId && metadata.rating != null) {
    const movie = await Movie.findById(movieId);
    if (movie) {
      const newCount = movie.ratingCount + 1;
      const newAvg =
        (movie.avgRating * movie.ratingCount + Number(metadata.rating)) / newCount;
      movie.avgRating = Math.round(newAvg * 10) / 10;
      movie.ratingCount = newCount;
      await movie.save();
    }
  }

  await Activity.create({
    type,
    user: userId || undefined,
    movie: movieId || undefined,
    message: metadata.message || '',
    metadata,
  });
}

async function startConsumer() {
  if (!enabled) {
    console.log('Kafka disabled — events processed inline');
    return;
  }

  try {
    const kafka = getKafka();
    const consumer = kafka.consumer({ groupId: 'herostream-analytics' });
    await consumer.connect();
    await consumer.subscribe({ topic: TOPIC, fromBeginning: false });

    await consumer.run({
      eachMessage: async ({ message }) => {
        try {
          const event = JSON.parse(message.value.toString());
          await handleEventLocally(event);
        } catch (err) {
          console.error('Consumer error:', err.message);
        }
      },
    });

    console.log('Kafka consumer listening on', TOPIC);
  } catch (err) {
    console.warn('Kafka consumer unavailable:', err.message);
  }
}

module.exports = { startConsumer, handleEventLocally, TOPIC };
