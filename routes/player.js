const express = require('express');
const router = express.Router();

// Parses url-encoded bodies
router.use(express.urlencoded({ extended: false }));

const { db, Games, Players } = require('../server');

// GET /player
// Return a list of all players
router.get('/', async (req, res, next) => {
	res.send('List of all players');
});

// GET /player/:playerId
// Returns a specific player, along with their games played.
router.get('/:playerId', async (req, res, next) => {
	try {
		res.send('Info of specific players');
	} catch (err) {
		next(err);
	}
});

module.exports = router;
