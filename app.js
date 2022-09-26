const express = require('express');
const app = express();

// Volleyball middleware
const volleyball = require('volleyball');
app.use(volleyball);

// Define routes
app.use('/game', require('./routes/game'));
app.use('/player', require('./routes/player'));

// Public
// eslint-disable-next-line no-undef
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
	const html = `try going to <a href="/game"> /Game </a> or <a href="/Player"> /Player </a>`;
	res.send(html);
});

const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Listening to port ${PORT}...`);
});
