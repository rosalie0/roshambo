const { db, Games, Players } = require('./server');

// Players has:  id, username
// Games has: id, result, playerId
const seedDb = async () => {
	await db.sync({ force: true, logging: false }); // Drops tables

	// Insert data into tables!
	const alice = await Players.create({
		username: 'alice',
	});

	const bob = await Players.create({
		username: 'bob',
	});

	const charlie = await Players.create({
		username: 'charlie',
	});

	// const firstGame = await Games.create({
	// 	result: 'tie',
	// 	playerId: 1,
	// });

	const games = [
		{ result: 'computer', playerId: 1 },
		{ result: 'human', playerId: 1 },
		{ result: 'tie', playerId: 1 },
		{ result: 'computer', playerId: 2 },
		{ result: 'human', playerId: 2 },
		{ result: 'tie', playerId: 2 },
		{ result: 'computer', playerId: 3 },
		{ result: 'human', playerId: 3 },
		{ result: 'tie', playerId: 3 },
	];

	const Promises = games.map((game) => Games.create(game));
	Promise.all(Promises);
};

seedDb();
