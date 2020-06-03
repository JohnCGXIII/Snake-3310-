      /** CONSTANTS **/
      const CANVAS_BORDER_COLOUR ="darkolivegreen";
      const CANVAS_BACKGROUND_COLOUR ="lightgreen";
      const CANVAS_STROKE_WIDTH="5"
      const SNAKE_COLOUR ="black"
      const SNAKE_OUTLINE="lightgreen"
      const SNAKE_STROKE_WIDTH="1"

      
      //snake starting position

      let snake = [
        {x: 220, y: 140},
        {x: 200, y: 140},
        {x: 180, y: 140},
        {x: 160, y: 140},
        {x: 140, y: 140}
      ]


      // Snake Starting movement
      let dx = 20;
      let dy = 0;

      //score
      let score =0 ;

      let changingDirection = false;

      // Get the canvas element
      var gameCanvas = document.getElementById("gameCanvas");
      // Return a two dimensional drawing context
      var ctx = gameCanvas.getContext("2d");
 
      /** FUNCTIONS **/
      
      /**Movement functions */

		//reset game
      function restart() {
        location.reload()
    }

    tick=200;

	// Get Faster
    function speedUp(){
    if (score > 100 && tick > 100) {
        tick -= (score/50);
        console.log(tick)
    }
}
	//Main
      function main() {

        if (didGameEnd()) return;

      setTimeout(function onTick() {
          changingDirection = false;
          cleanCanvas();
          advanceSnake();
          drawSnake();
          drawFood();
          main();
      },tick);
      }
	  
	  /** Controls **/

		//Touchscreen Controls
      function touchScreen(direction) {
        if (direction === 'up') {
            dy = -20;
            dx = 0;
        }
        if (direction === 'down') {
            dy = 20;
            dx = 0;
        }
        if (direction === 'left') {
            dx = -20;
            dy = 0;
        }
        if (direction === 'right') {
            dx = 20;
            dy = 0;
        }
      }

		//Keyboard Controls
      function changeDirection(event) {
          const LEFT_KEY = 37;
          const RIGHT_Key = 39;
          const UP_Key = 38;
          const DOWN_KEY = 40;

          if (changingDirection) return;

          changingDirection = true;
      
          const keyPressed = event.keyCode;
          const goingUp = dy === -20;
          const goingDown = dy === 20;
          const goingRight = dx === 20;
          const goingLeft = dx === -20;
      
		//Left
          if (keyPressed === LEFT_KEY && !goingRight) {
              dx= -20;
              dy = 0;
          }
      
		//Up
          if (keyPressed === UP_Key && !goingDown) {
              dx = 0;
              dy = -20;
          }
      
		//Right
          if (keyPressed === RIGHT_Key && !goingLeft) {
              dx = 20;
              dy = 0;
          }
		//Down
          if (keyPressed === DOWN_KEY && !goingUp) {
              dx = 0;
              dy = 20;
          }
		  
        var x = event.keyCode;
        if (x == 32) {  // spacebar to reset
            location.reload(); }
      }
	
	
	/** Game Start **/
	//Draw Snake
      function drawSnake() {
          snake.forEach(drawSnakePart);
      }
      

      function advanceSnake() {
          const head = {x: snake[0].x + dx, y: snake[0].y + dy};

          //Move snake by adding a new item to array
          snake.unshift(head);

            //Check if on food
          const didEatFood = snake[0].x === foodX && snake[0].y === foodY;
          if (didEatFood) {
            score += 10;
            speedUp();
            document.getElementById('score').innerHTML = "Score:" + score;              
              createFood();
          } else {
          //remove tail to simulate movement
          snake.pop();
          }
      }
      
      /**UI AND COLOUR FUNCTIONS */

      function cleanCanvas() {
      //Colour Select
      ctx.fillStyle = CANVAS_BACKGROUND_COLOUR;

      //Select the Colour for the border
      ctx.strokeStyle = CANVAS_BORDER_COLOUR;
      ctx.lineWidth = CANVAS_STROKE_WIDTH;

      // Background Rectange
      ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
      ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
      }

      //draw snake parts
      function drawSnakePart(snakePart) {
        ctx.fillStyle = SNAKE_COLOUR;
        ctx.strokeStyle = SNAKE_OUTLINE;
        ctx.lineWidth = SNAKE_STROKE_WIDTH;
        ctx.fillRect(snakePart.x, snakePart.y, 20, 20);
        ctx.strokeRect(snakePart.x, snakePart.y, 40, 40);
    }

      /** GENERATE FOOD */
      function randomTen(min, max) {
          return Math.round((Math.random()*(max-min)+ min)/20)*20;
      }

      function createFood() {
          foodX = randomTen(0, gameCanvas.width - 20);
          foodY = randomTen(0, gameCanvas.height -20);

          snake.forEach(function isFoodOnSnake(part) {
              const foodIsOnSnake = part.x == foodX && part.y == foodY
              if (foodIsOnSnake)
                createFood();
          });
      }

      function drawFood() {
        ctx.fillStyle = 'darkolivegreen';
        ctx.fillRect(foodX, foodY, 20, 20);
        ctx.strokeRect(foodX, foodY, 20, 20);
    }

/**did game end */

function didGameEnd() {
    for (let i = 4; i < snake.length; i++) {
        const didCollide = snake[i].x === snake[0].x && snake[i].y === snake[0].y
        if (didCollide) return true
    }

    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > gameCanvas.width - 20;
    const hitTopWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y > gameCanvas.height - 20;

    return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall
}

/** GAME LOAD */
function gameLoad() {
    cleanCanvas();
  createFood();
  main();
  document.addEventListener("keydown",changeDirection)
}