module.exports = () => `
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<link rel="stylesheet" href="/style.css" />
		<title>Game Form</title>
	</head>
	<body>
  <h1>Submit a new game for an existing player below</h1>
  <div>
    <form method="post" action="/game">
      <label for="playerId"> Player ID: </label>
      <input type="text" name="playerId">

      <p> Choose which symbol to play </p>
      <input type="radio" name="symbol" value="paper" />
      <label for="paper">Paper</label>
  
      <input type="radio" name="symbol" value="scissors" />
      <label for="scissors">Scissors</label>
  
      <input type="radio" name="symbol" value="rock" />
      <label for="rock">Rock</label>
      <button type="submit">Play Game!</button>
    </form>
  </div>
  </body>
</html>
`;
