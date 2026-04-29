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

    bubbles = [];

}




updateGame()       // main game loop
    moveBaton()    // moves the baton left or right if a button is being held down
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
