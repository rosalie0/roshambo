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
		unique: true,
		get() {
			return '@' + this.getDataValue('username');
		},
	},

	fullName: {
		type: Sequelize.VIRTUAL,
		get() {
			const f = this.getDataValue('firstName');
			const m = this.getDataValue('middleName');
			const l = this.getDataValue('lastName');
			return `${f} ${m} ${l}`;
		},
	},

	firstName: {
		type: Sequelize.STRING,
		allowNull: false,
		set(value) {
			const noCasing = value.toLowerCase();
			this.setDataValue('firstName', noCasing);
		},
		get() {
			// Capitalize first letter
			const n = this.getDataValue('firstName');
			const firstLetter = n[0].toUpperCase();
			const restOfN = n.slice(1);
			return firstLetter + restOfN;
		},
	},

	middleName: {
		type: Sequelize.STRING,
		allowNull: true,
		set(value) {
			const noCasing = value.toLowerCase();
			this.setDataValue('middleName', noCasing);
		},
		get() {
			// Capitalize first letter
			const n = this.getDataValue('middleName');
			const firstLetter = n[0].toUpperCase();
			const restOfN = n.slice(1);
			return firstLetter + restOfN;
		},
	},

	lastName: {
		type: Sequelize.STRING,
		allowNull: false,
		set(value) {
			const noCasing = value.toLowerCase();
			this.setDataValue('lastName', noCasing);
		},
		get() {
			// Capitalize first letter
			const n = this.getDataValue('lastName');
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
