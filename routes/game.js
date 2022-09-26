const express = require('express');
const router = express.Router();

// Parses url-encoded bodies
router.use(express.urlencoded({ extended: false }));

// Import Models
const { Games, Players } = require('../server');

// Import Views
const gameDetails = require('../views/gameDetails');
const gameForm = require('../views/gameForm');
const gameResults = require('../views/gameResults');

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
		res.send(gameForm());
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

		// Error check playerId
		if (isNaN(playerId) || playerId % 1 !== 0 || playerId < 1) {
			res.send('Please enter an whole NUMBER for PlayerId.');
		}
		// Get player instance from Model
		const player = await Players.findByPk(playerId);

		if (!player) {
			res.send(`Sorry, Unable to find a player with the ID number ${playerId}`);
		}

		const gameLog = []; // An array of strings that describe the actions of the game.
		gameLog.push(`${player.username} plays ${playerMove}!`);

		//Pick a random symbol using javascript for the computer
		const computerMove = randomMove();
		gameLog.push(`Computer plays ${computerMove}!`);

		gameLog.push(`The winner is...`);

		// Calculate who wins
		const gameResult = calculateWinner(playerMove, computerMove);
		gameLog.push(`${gameResult.toUpperCase()}!`);

		// Create a game with the resulting winner
		await Games.create({
			result: gameResult,
			playerId: playerId,
		});

		gameLog.push(`Game instance created & stored in the database.`);
		res.send(gameResults(gameLog));
	} catch (err) {
		next(err);
	}
});
module.exports = router;
