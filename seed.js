const { db, Games, Players } = require('./server');

//          SCHEMA:
// Players has:  id, username
// Games has: id, result, playerId

const seedDb = async () => {
	await db.sync({ force: true, logging: false }); // Drops tables

	// Insert data into tables!
	const alice = await Players.create({
		username: 'aliceAbbot',
		firstName: 'alice',
		middleName: 'temp',
		lastName: 'abbot',
	});

	const bob = await Players.create({
		username: 'n00bslayer',
		firstName: 'BOB',
		middleName: 'BOOKER',
		lastName: 'BROWN',
	});

	const charlie = await Players.create({
		username: 'n00b',
		firstName: 'Charlie',
		middleName: 'Carter',
		lastName: 'Clark',
	});

	const games = [
		{ result: 'computer', playerId: alice.id },
		{ result: 'human', playerId: alice.id },
		{ result: 'tie', playerId: alice.id },
		{ result: 'computer', playerId: bob.id },
		{ result: 'human', playerId: bob.id },
		{ result: 'tie', playerId: bob.id },
		{ result: 'computer', playerId: charlie.id },
		{ result: 'human', playerId: charlie.id },
		{ result: 'tie', playerId: charlie.id },
	];

	const Promises = games.map((game) => Games.create(game));
	Promise.all(Promises);
};

seedDb();
