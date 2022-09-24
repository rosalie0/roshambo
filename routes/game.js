const express = require('express');
const router = express.Router();

// Parses url-encoded bodies
router.use(express.urlencoded({ extended: false }));

// Import Models
const { Games, Players } = require('../server');

// Import Views
const gameDetails = require('../views/gameDetails');

// USED FOR EXTRA CREDIT:
// Import functions used for solving roshambo games
const { randomMove, calculateWinner } = require('../roshamboLogic');

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

		res.send(gameDetails(gameInstance, playerInstance));
	} catch (error) {
		next(error);
	}
});

router.get('/', async (req, res, next) => {
	try {
		res.send('printing random moves');
	} catch (err) {
		next(err);
	}
});

// EXTRA CREDIT
// POST /game
router.post('/', async (req, res, next) => {
	try {
		// Parse body
		const playerMove = req.body.symbol;
		const playerId = +req.body.playerId;

		// Get player instance from Model
		const player = await Players.findByPk(playerId);
		let msg = `${player.username} plays ${playerMove}!\n`;

		//Pick a random symbol using javascript for the computer
		const computerMove = randomMove();
		msg += `Computer plays ${computerMove}!\n`;

		// Calculate who wins
		const gameResult = calculateWinner(playerMove, computerMove);
		msg += `The winner is... ${gameResult}!\n`;

		// Create a game with the resulting winner
		const game = await Games.create({
			result: gameResult,
			playerId: playerId,
		});

		msg += `Game instance created: \n${game}\n`;
		res.send(msg);
	} catch (err) {
		next(err);
	}
});
module.exports = router;
