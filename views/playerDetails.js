module.exports = (player, games) => `
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<link rel="stylesheet" href="/style.css" />
		<title>${player.username} Details</title>
	</head>
	<body>
    <h1> ${player.username} Details </h1>
		<ul>
		<li> Full Name: ${player.fullName}</li>
		<li> DOB: ${player.dob}</li>
		</ul>
    <h3> Below are the games that ${player.username} has played: </h3>
    <div class="game-card-container">
      ${games
				.map(
					(game) => `
          <div class="game-card">
            <p> Game ID: ${game.id} </p>
            <p> Game Winner: ${game.result} </p>
          </div>
        `
				)
				.join('')}

    </div>
  </body>
</html>
`;
