const express = require('express');
const router = express.Router();

// Parses url-encoded bodies
router.use(express.urlencoded({ extended: false }));

const { db, Games, Players } = require('../server');

// GET /game/:gameId
// Returns the winner for the game matching the given ID,
// as well as the player for the game
router.get('/:gameId', async (req, res, next) => {
	try {
		const gameId = +req.params.gameId;
		const gameInstance = await Games.findByPk(gameId);

		// Get playerInstance gameInstance's playerId
		const playerId = gameInstance.playerId;
		const playerInstance = await Players.findByPk(playerId);
		res.send(`
		<p>
			For Game ${gameId}, which ${playerInstance.username} played,
			${gameInstance.result} was the winner.
		</p>`);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
