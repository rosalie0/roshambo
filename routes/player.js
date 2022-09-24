const express = require('express');
const router = express.Router();

// Parses url-encoded bodies
router.use(express.urlencoded({ extended: false }));

// Import Views
const playerDetails = require('../views/playerDetails');
const playerList = require('../views/playerList');

// Import tables
const { db, Games, Players } = require('../server');

// GET /player
// Return a list of all players
router.get('/', async (req, res, next) => {
	try {
		const players = await Players.findAll();

		res.send(playerList(players));
	} catch (err) {
		next(err);
	}
});

// GET /player/:playerId
// Returns a specific player, along with their games played.
router.get('/:playerId', async (req, res, next) => {
	try {
		const playerId = +req.params.playerId;
		const player = await Players.findByPk(playerId);

		const gamesPlayed = await Games.findAll({
			where: {
				playerId: playerId,
			},
		});

		res.send(playerDetails(player, gamesPlayed));
		// res.send(`Info of ${player.username} who has played these games ${gamesPlayed}`);
	} catch (err) {
		next(err);
	}
});

module.exports = router;
