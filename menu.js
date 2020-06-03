/** Initialise */

// Create Snake Graphic for menu
let menuSnake = [
    {x: 220, y: 40},
    {x: 200, y: 40},
    {x: 180, y: 40},
    {x: 160, y: 40},
    {x: 140, y: 40}
  ]

  // Create Text for menu
  let menuText =
  [
    "Snaaaaaaaaake",
    "Arrow Keys Move",
    "Space Bar Resets",
    "Touch Screen Controls Mobile",
    "Press any Key to Start"
  ]

/** Functions */

function drawMenuSnake() {
    menuSnake.forEach(drawSnakePart);
}

 
      
    //LOAD GAME
    function gameStart() {
        if ((event.keyCode > 0 && menuScreen === "True") || (event.clientX>0 && menuScreen === "True")) {
            menuScreen = "False";
            gameLoad();
        }
    } 
    
    
//Default Screen

    menuScreen = "True";

                   //Colour Select
                   ctx.fillStyle = CANVAS_BACKGROUND_COLOUR;

                   //Select the Colour for the border
                   ctx.strokeStyle = CANVAS_BORDER_COLOUR;
                   ctx.lineWidth = CANVAS_STROKE_WIDTH;
 
                   // Rectange
                   ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
                   ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
 
                   //Draw Snake
                   drawMenuSnake()
 
                   //Text
                   fontsize = 30;
                   textPosition = gameCanvas.height/3;
                   ctx.font = fontsize + "px Arial";
                   ctx.fillStyle = "black"
                 for (var i=0; i < menuText.length; i++) {
                     ctx.fillText(menuText[i],10,textPosition)
                     textPosition += fontsize
                 }   
     
document.addEventListener("keydown",gameStart)
document.addEventListener("click",gameStart)
