// A file containing helper functions used for calculating roshambo games.

/**
 *
 * @returns Returns either 'rock' 'paper' or 'scissors, randomly.
 */
const randomMove = () => {
	const num = Math.floor(Math.random() * 3);
	console.log(num);
	if (num === 0) return 'paper';
	if (num === 1) return 'scissors';
	else return 'rock';
};

/**
 * Calculates and returns if the human or computer won, or tie.
 * @param {string} humanMove Either 'rock' 'paper' or 'scissors'
 * @param {string} computerMove Either 'rock' 'paper' or 'scissors
 * @returns 'human' 'computer' or 'tie'
 */
const calculateWinner = (humanMove, computerMove) => {
	if (humanMove === computerMove) return 'tie';
	if (humanMove === 'paper') {
		if (computerMove === 'scissors') return 'computer';
		if (computerMove === 'rock') return 'human';
	}
	if (humanMove === 'scissors') {
		if (computerMove === 'rock') return 'computer';
		if (computerMove === 'paper') return 'human';
	}
	if (humanMove === 'rock') {
		if (computerMove === 'paper') return 'computer';
		if (computerMove === 'scissors') return 'human';
	}
};
module.exports = { randomMove, calculateWinner };
