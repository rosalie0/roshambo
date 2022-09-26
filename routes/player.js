const express = require('express');
const router = express.Router();

// Parses url-encoded bodies
router.use(express.urlencoded({ extended: false }));

// Import Views
const playerDetails = require('../views/playerDetails');
const playerList = require('../views/playerList');

// Import tables
const { Games, Players } = require('../server');

// *********** ROUTE HANDLING *********** //

// PUT /player/:playerId
// Updates a players name to be the given name.
router.put('/:playerId', async (req, res, next) => {
	try {
		const newUsername = req.body.username;

		// Get the player of playerId
		const player = await Players.findByPk(+req.params.playerId);
		// Update player with newUsername
		await player.update({
			username: newUsername,
		});
		res.send(
			`Successfully updated player ${player.id}'s username to ${player.username}`
		);
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

// GET /player
// Return a list of all players
router.get('/', async (req, res, next) => {
	try {
		const players = await Players.findAll();

		// Sort players array so that ID 1 is first.
		players.sort((a, b) => a.id - b.id);
		res.send(playerList(players));
	} catch (err) {
		next(err);
	}
});

module.exports = router;
