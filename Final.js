// canvas variables
var canvas, pen;

// game constants
var bubbleRadius = 10;  // radius of every bubble
var bubbleSpeed = 2;    // changes depending on difficulty
var totalBubbles = 100; // amount of bubbles able to be released

// game state
var bubbles;    // array used to give bubbles their properties
var stepCount;  
var burstCount;     // number of bubbles popped by the batton
var escapedCount;   //number of bubbles that pass the button
var releasedCount;  // number of bubbles released so far
var releaseRate;    // how often a new bubble gets released, depending on difficulty
var timer;          // timer for the game loop
var gameOver;       // determines when game ends

// baton variables
var batonX;     // x position of baton
var batonY;     // y position of baton
var batonWidth;     // width 
var batonHeight;
var batonDX;
var batonSpeed;
var batonColor;

function startGame()
{
    canvas = document.getElementById('myCanvas');
    pen = canvas.getContext('2d');

    bubbles = [];        // start with no bubbles on the screen
    stepCount = 0;       // start the step counter at 0
    burstCount = 0;      // start with 0 popped bubbles
    escapedCount = 0;    // start with 0 escaped bubbles
    releasedCount = 0;   // start with 0 released bubbles
    releaseRate = 35;    // start on easy mode
    gameOver = false;    // 
    
    batonX = 200;         // starting x position
    batonY = 250;         // fixed y position
    batonWidth = 50;    
    batonHeight = 10;
    batonDX = 0;           // baton is not moving at the start
    batonSpeed = 20;       // baton moves 20 pixels per step
    batonColor = 'blue';   // baton color required by the project

    timer = setInterval(updateGame, 50);             // run updateGame every 50 milliseconds
}





updateGame()       // main game loop
function moveBaton()    // moves the baton left or right if a button is being held down
{
    baton = document.getElementById('moveLeft()').addEventListener('click', () => {
        position -= 10; //move left by 20px
     })
  document.getElementById('moveRight').addEventListener('click', () => {
    position += 20; //move right by 20px
  })   
}   // moves the baton left or right if a button is being held down
    releaseBubble() // creates a new bubble when enough steps have passed
    moveBubbles()  // moves all active bubbles downward
    checkBubbles() // checks whether bubbles were burst or escaped
    drawEverything() // clears and redraws the canvas, bubbles, and baton
    updateStats()  // updates the burst, escaped, and steps text on the page
    checkGameOver() // ends the game after all 100 bubbles are burst or escaped

moveLeft()         // starts moving the baton left
moveRight()        // starts moving the baton right
stopMove()         // stops the baton from moving

check(value)       // changes the difficulty based on the radio button selected

randomColor()      // creates and returns a random color for a bubble
