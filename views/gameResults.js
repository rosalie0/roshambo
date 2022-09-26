module.exports = (gameLog) => `
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<link rel="stylesheet" href="/style.css" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
		<title>Document</title>
    <script>
      $(document).ready( function() {
        const messages = $("h5");
        $(messages[0]).show(); // Show human move
        $(messages[1]).show(); // Show computer move


        setTimeout( () => {
          $(messages[2]).show(); // Show 'winner is...'
        }, 1000);
        
        setTimeout( () => {
          $(messages[3]).show();
          $(messages[3]).css("fontSize", "60px");
          $(messages[3]).css("color", "red");

          $(messages[4]).show();
        }, 3000);
      })
    </script>
	</head>
	<body>
    <div class="game-results">
      ${gameLog
				.map(
					(message) => `
          <h5 class="game-result-messages"> ${message} </h5>
          `
				)
				.join('')}
    </div>
	</body>
</html>
`;
