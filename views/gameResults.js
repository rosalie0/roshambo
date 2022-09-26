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
        $(messages[0]).show(); // Show first move

        // Rest of messages are time delayed.
        let counter = 1;
        const messageInterval = setInterval(() => {
          $(messages[counter]).show();
          counter++;
          if (counter > messages.length) {
            console.log('Stopping interval');
            clearInterval(messageInterval);
          };
        }, 1500);
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
