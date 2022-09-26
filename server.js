const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/roshambo');

const monthInEnglish = (n) => {
	const englishMonths = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];
	return englishMonths[n - 1];
};

// Games table has...
// 'Result', which must be ither "computer", "human", or "tie"
const Games = db.define('games', {
	result: {
		type: Sequelize.ENUM(['computer', 'human', 'tie']),
		allowNull: false,
	},
});

// Player table has...
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
			let f = this.getDataValue('firstName');
			let m = this.getDataValue('middleName');
			let l = this.getDataValue('lastName');

			f = f[0].toUpperCase() + f.slice(1);
			l = l[0].toUpperCase() + l.slice(1);

			if (m) {
				m = m[0].toUpperCase() + m.slice(1);
				return `${f} ${m} ${l}`;
			} else return `${f} ${l}`;
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

	joinDate: {
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW,
	},

	dob: {
		type: Sequelize.DATEONLY,
		get() {
			// Original format is YYYY-MM-DD
			const [year, month, day] = this.getDataValue('dob').split('-');
			const enMonth = monthInEnglish(parseInt(month));

			const sentence = `${enMonth} ${day}, ${year}`;
			return sentence;
		},
	},
});

// Associate tables
Games.belongsTo(Players); // Every game has one human player
Players.hasMany(Games); // Every player has many games

module.exports = { db, Games, Players };
