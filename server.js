const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/roshambo');

// Games table has...
// 'Result', which must be ither "computer", "human", or "tie"
const Games = db.define('games', {
	result: {
		type: Sequelize.ENUM(['computer', 'human', 'tie']),
		allowNull: false,
	},
});

// Player table has...
// 'Username', which is a string representing a player's name
const Players = db.define('players', {
	username: {
		type: Sequelize.STRING,
		allowNull: false,
		get() {
			// Capitalize first letter
			const n = this.getDataValue('username');
			const firstLetter = n[0].toUpperCase();
			const restOfN = n.slice(1);
			return firstLetter + restOfN;
		},
	},
});

// Associate tables
Games.belongsTo(Players); // Every game has one human player
Players.hasMany(Games); // Every player has many games

module.exports = { db, Games, Players };
