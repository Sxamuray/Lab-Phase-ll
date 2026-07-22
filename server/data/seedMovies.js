require('dotenv').config({ path: './config.env' });
const mongoose = require('mongoose');
const Movie = require('../models/Movie');

const movies = [
  {
    title: 'Iron Man',
    universe: 'Marvel',
    year: 2008,
    director: 'Jon Favreau',
    description: 'Tony Stark builds a powered suit and becomes the armored Avenger.',
    poster: 'https://image.tmdb.org/t/p/w500/78l9w0uM991CtXeVk5oH7Ulf0ZK.jpg',
    tags: ['action', 'origin'],
  },
  {
    title: 'The Avengers',
    universe: 'Marvel',
    year: 2012,
    director: 'Joss Whedon',
    description: 'Earth mightiest heroes assemble to stop Loki and an alien invasion.',
    poster: 'https://image.tmdb.org/t/p/w500/RYMX2wcKCBAr24UmPDcuC3YmDbH.jpg',
    tags: ['team-up', 'action'],
  },
  {
    title: 'Black Panther',
    universe: 'Marvel',
    year: 2018,
    director: 'Ryan Coogler',
    description: 'TChalla returns to Wakanda to claim the throne and defend his nation.',
    poster: 'https://image.tmdb.org/t/p/w500/uxzzxijgPIY7slzFvMotPv8wjKA.jpg',
    tags: ['action', 'drama'],
  },
  {
    title: 'Spider-Man: No Way Home',
    universe: 'Marvel',
    year: 2021,
    director: 'Jon Watts',
    description: 'Peter Parker seeks help when his secret identity is exposed to the world.',
    poster: 'https://image.tmdb.org/t/p/w500/1g0dhYXt9o5NrwGy0touPAX3mh3.jpg',
    tags: ['multiverse', 'action'],
  },
  {
    title: 'Guardians of the Galaxy',
    universe: 'Marvel',
    year: 2014,
    director: 'James Gunn',
    description: 'A group of intergalactic misfits band together to save the galaxy.',
    poster: 'https://image.tmdb.org/t/p/w500/rSPrw7qqAY1rOhQ61sEncCLIU4h.jpg',
    tags: ['space', 'comedy'],
  },
  {
    title: 'Captain America: The Winter Soldier',
    universe: 'Marvel',
    year: 2014,
    director: 'Anthony Russo, Joe Russo',
    description: 'Cap uncovers a conspiracy within S.H.I.E.L.D. while facing the Winter Soldier.',
    poster: 'https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
    tags: ['thriller', 'action'],
  },
  {
    title: 'The Dark Knight',
    universe: 'DC',
    year: 2008,
    director: 'Christopher Nolan',
    description: 'Batman faces the Joker, a criminal mastermind who plunges Gotham into chaos.',
    poster: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911rYme7kfwM1n.jpg',
    tags: ['crime', 'drama'],
  },
  {
    title: 'Wonder Woman',
    universe: 'DC',
    year: 2017,
    director: 'Patty Jenkins',
    description: 'Diana leaves Themyscira to stop a world war and discover her destiny.',
    poster: 'https://image.tmdb.org/t/p/w500/imekS7f1OuHyUP2LAiT0b6cVfHf.jpg',
    tags: ['origin', 'action'],
  },
  {
    title: 'Man of Steel',
    universe: 'DC',
    year: 2013,
    director: 'Zack Snyder',
    description: 'Clark Kent embraces his Kryptonian heritage as Earth faces General Zod.',
    poster: 'https://image.tmdb.org/t/p/w500/7BWXVfJClqqj98Nkp7TXaXv4d2a.jpg',
    tags: ['origin', 'action'],
  },
  {
    title: 'Aquaman',
    universe: 'DC',
    year: 2018,
    director: 'James Wan',
    description: 'Arthur Curry must claim the throne of Atlantis to prevent war with the surface.',
    poster: 'https://image.tmdb.org/t/p/w500/xBPjFPz2L99WP377ZML7PxqfyXf.jpg',
    tags: ['fantasy', 'action'],
  },
  {
    title: 'The Batman',
    universe: 'DC',
    year: 2022,
    director: 'Matt Reeves',
    description: 'Batman investigates corruption in Gotham while tracking the Riddler.',
    poster: 'https://image.tmdb.org/t/p/w500/b0Pl0SMKzAXnHu2cLdM9K5Qf6Uz.jpg',
    tags: ['noir', 'detective'],
  },
  {
    title: 'Justice League',
    universe: 'DC',
    year: 2017,
    director: 'Zack Snyder',
    description: 'Batman and Wonder Woman recruit a team of metahumans to save the planet.',
    poster: 'https://image.tmdb.org/t/p/w500/9rjlPqNfkS1WxJ2f5G8G4yQJcVd.jpg',
    tags: ['team-up', 'action'],
  },
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  await Movie.deleteMany({});
  await Movie.insertMany(movies);
  console.log(`Seeded ${movies.length} movies`);
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
