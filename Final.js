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
var timer;     
function startTimer(display){
    startTime = Date.now()

    function updateTimer(){
        let elapsed = Math.floor ((Date.now() - startTime) / 1000);
        let minutes = String(Math.floor(elapsed / 60)).padStart(2, '0');
        let seconds = String(elapsed % 60).padStart(2, '0');
        display.textContent = minutes + ':' + seconds;
    }
    updateTimer();
    timerInterval = setInterval(updateTimer, 1000);
}
function stopTimer(){
    clearInterval(timerInterval);
    timerInterval = null;

}
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





function updateGame()       // main game loop
{
    if (gameOver)
    {
        return;
    }

    stepCount++;    // counts one game step every 50 milliseconds
    moveBaton();    // moves the baton left or right if a button is being held down
    releaseBubble(); // creates a new bubble when enough steps have passed
    moveBubbles();  // moves all active bubbles downward
    checkBubbles(); // checks whether bubbles were burst or escaped
    drawEverything(); // clears and redraws the canvas, bubbles, and baton
    updateStats();  // updates the burst, escaped, and steps text on the page
    checkGameOver(); // ends the game after all 100 bubbles are burst or escaped
}

function moveBaton()    // moves the baton left or right if a button is being held down
{
    baton = document.getElementById('moveLeft()').addEventListener('click', () => {
        position -= 10; //move left by 20px
     })
  document.getElementById('moveRight').addEventListener('click', () => {
    position += 20; //move right by 20px
  })   
}   // moves the baton left or right if a button is being held down

function releaseBubble() // creates a new bubble when enough steps have passed
{
    if (releasedCount < totalBubbles && stepCount % releaseRate == 0)
    {
        var bubbleX = Math.floor(Math.random() * (canvas.width - bubbleRadius * 2)) + bubbleRadius;
        var bubbleY = bubbleRadius;
        var bubbleColor = randomColor();

        bubbles.push([bubbleX, bubbleY, bubbleColor]);
        releasedCount++;
    }
}

function moveBubbles()        // moves all active bubbles downward
{
    for (var i = 0; i < bubbles.length; i++)
    {
        bubbles[i][1] += bubbleSpeed;  // add to the y position so the bubble moves down
    }
}


function checkBubbles() // checks whether bubbles were burst or escaped
{
    for (var i = bubbles.length - 1; i >= 0; i--)
    {
        var bubbleX = bubbles[i][0];
        var bubbleY = bubbles[i][1];

        // A bubble bursts if any part of the circle touches the baton.
        var closestX = Math.max(batonX, Math.min(bubbleX, batonX + batonWidth));
        var closestY = Math.max(batonY, Math.min(bubbleY, batonY + batonHeight));
        var distanceX = bubbleX - closestX;
        var distanceY = bubbleY - closestY;
        var bubbleHitBaton = distanceX * distanceX + distanceY * distanceY <= bubbleRadius * bubbleRadius;

        if (bubbleHitBaton)
        {
            burstCount++;
            bubbles.splice(i, 1);
        }
        // A bubble escapes if it reaches the bottom of the canvas.
        else if (bubbleY + bubbleRadius >= canvas.height)
        {
            escapedCount++;
            bubbles.splice(i, 1);
        }
    }
}
drawEverything() // clears and redraws the canvas, bubbles, and baton
updateStats()  // updates the burst, escaped, and steps text on the page
checkGameOver() // ends the game after all 100 bubbles are burst or escaped
moveLeft()
    function moveLeft() {
document.getElementById('moveLeft').addEventListener('click', function(){
    postition -= step;
    if (postition <0) position = 0; 
    baton.style.left = postition + 'px'

});}
        // starts moving the baton left
moveRight()    
    function moveRight() {
document.getElementById('moveRight').addEventListener('click', function(){
    postion += step;
    const maxRight = window.innerWidth - baton.offsetWidth;
    if (position > maxRight) postion = maxRight;
    baton.style.left = position + 'px'
});}   // starts moving the baton right
stopMove()         // stops the baton from moving

check(value)       // changes the difficulty based on the radio button selected

function randomColor()      // creates and returns a random color for a bubble
{
    var red = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);

    return 'rgb(' + red + ',' + green + ',' + blue + ')';
}
