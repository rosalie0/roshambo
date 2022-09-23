const express = require('express');
const volleyball = require('volleyball');
const app = express();

// Define routes
app.use('/game', require('./routes/game'));
app.use('/player', require('./routes/player'));

app.use(volleyball);
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
	const html = `try going to <a href="/game"> /Game </a> or <a href="/Player"> Player </a>`;
	res.send(html);
});

const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Listening to port ${PORT}...`);
});
