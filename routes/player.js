const router = require('express').Router();

// Parses url-encoded bodies
router.use(express.urlencoded({ extended: false }));

const { db, Games, Player } = require('./server');

// GET /player
// Return a list of all players
router.get('/', async (req, res, next) => {});

// GET /player/:playerId
// Returns a specific player, along with their games played.
