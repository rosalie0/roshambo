const { db, Games, Players } = require('./server');

//          SCHEMA:
// Players has:  id, username (unique),
//							 firstName, middleName (optional), lastName,
//							 fullName (virtual),
//							 DOB, Date of account creation
// Games has: id, result, playerId

const seedDb = async () => {
	await db.sync({ force: true, logging: false }); // Drops tables

	// Insert data into tables!
	const alice = await Players.create({
		username: 'aliceAbbot',
		firstName: 'alice',
		lastName: 'abbot',
		dob: '2001-01-11',
	});

	const bob = await Players.create({
		username: 'n00bslayer',
		firstName: 'BOB',
		middleName: 'BOOKER',
		lastName: 'BROWN',
		dob: '2002-02-22',
	});

	const charlie = await Players.create({
		username: 'n00b',
		firstName: 'Charlie',
		middleName: 'Carter',
		lastName: 'Clark',
		dob: '2003-12-03',
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
