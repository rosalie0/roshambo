module.exports = (game, player) => `
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<link rel="stylesheet" href="/style.css">

		<title>Game ${game.id} Details</title>
	</head>
	<body>
    <p>
			For Game ${game.id}, which ${player.username} played,
			${game.result} was the winner.
		</p>
  </body>
</html>
`;
