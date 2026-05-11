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
var startTime;      // starting time for the clock
var timerInterval; // timer for the clock
var statsText;     // paragraph for the game stats
var outputText;    // spot for the final message
var leftButton;    // left button on the page
var rightButton;   // right button on the page
function startTimer(display){
    if (display == null)
    {
        return;     // stops if there is no timer display
    }

    stopTimer();    // clears the old timer
    startTime = Date.now();

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
    if (timerInterval != null)
    {
        clearInterval(timerInterval);
        timerInterval = null;
    }

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
    canvas.width = 450;         // set the required width
    canvas.height = 300;        // set the required height
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

    setupPage();            // sets up buttons and text
    drawEverything();       // draws the starting screen
    updateStats();          // shows the starting stats
    startTimer(document.getElementById('timer')); // starts the clock

    if (timer != null)
    {
        clearInterval(timer);   // clears the old game loop
    }
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
    batonX += batonDX;     // moves the baton by its speed

    if (batonX < 0)
    {
        batonX = 0;        // keeps the baton inside the left wall
    }

    if (batonX + batonWidth > canvas.width)
    {
        batonX = canvas.width - batonWidth; // keeps the baton inside the right wall
    }
}

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
function drawEverything() // clears and redraws the canvas, bubbles, and baton
{
    pen.fillStyle = '#EAEDDC';
    pen.fillRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < bubbles.length; i++)
    {
        pen.beginPath();
        pen.arc(bubbles[i][0], bubbles[i][1], bubbleRadius, 0, 2 * Math.PI);
        pen.fillStyle = bubbles[i][2];
        pen.fill();
    }

    pen.fillStyle = batonColor;
    pen.fillRect(batonX, batonY, batonWidth, batonHeight);
}

function setupPage()    // connects the HTML to the game
{
    statsText = document.getElementsByTagName('p')[0]; // uses your stats paragraph

    outputText = document.getElementById('output'); // gets the output message

    if (outputText == null)
    {
        outputText = document.createElement('h2'); // makes the output message
        outputText.id = 'output';
        statsText.parentNode.insertBefore(outputText, statsText.nextSibling);
    }

    outputText.textContent = ''; // clears the old message

    leftButton = document.getElementById('moveLeft();'); // gets left button
    rightButton = document.getElementById('moveRight();'); // gets right button

    if (leftButton != null)
    {
        leftButton.onmousedown = moveLeft; // starts moving left
        leftButton.onmouseup = stopMove;   // stops moving left
        leftButton.onmouseleave = stopMove; // stops if the mouse leaves
    }

    if (rightButton != null)
    {
        rightButton.onmousedown = moveRight; // starts moving right
        rightButton.onmouseup = stopMove;    // stops moving right
        rightButton.onmouseleave = stopMove; // stops if the mouse leaves
    }

    var easy = document.getElementById('modeEasy'); // easy radio button
    var moderate = document.getElementById('modeMod'); // moderate radio button
    var hard = document.getElementById('modeHard'); // hard radio button

    if (easy != null)
    {
        easy.checked = true;        // starts on easy
        easy.onchange = function(){ check(this.value); }; // changes to easy
    }

    if (moderate != null)
    {
        moderate.onchange = function(){ check(this.value); }; // changes to moderate
    }

    if (hard != null)
    {
        hard.onchange = function(){ check(this.value); }; // changes to hard
    }
}

function updateStats()  // updates the burst, escaped, and steps text on the page
{
    statsText.innerHTML = 'Burst= ' + burstCount + '&nbsp;&nbsp; Escaped= ' + escapedCount + '&nbsp;&nbsp; Steps Elapsed= ' + stepCount;
}

function checkGameOver() // ends the game after all 100 bubbles are burst or escaped
{
    if (releasedCount == totalBubbles && bubbles.length == 0)
    {
        gameOver = true;      // marks the game as done
        clearInterval(timer); // stops the game loop
        timer = null;
        stopTimer();          // stops the clock

        var success = (burstCount / totalBubbles) * 100; // finds the success percent
        outputText.textContent = 'Game over! Success: ' + success.toFixed(0) + '%';
    }
}

function moveLeft() // starts moving the baton left
{
    batonDX = -batonSpeed; // sets left movement
    moveBaton();          // moves once for a click
    drawEverything();     // redraws after the click
}

function moveRight() // starts moving the baton right
{
    batonDX = batonSpeed; // sets right movement
    moveBaton();         // moves once for a click
    drawEverything();    // redraws after the click
}

function stopMove() // stops the baton from moving
{
    batonDX = 0;     // stops side movement
}

function check(value) // changes the difficulty based on the radio button selected
{
    var mode = value.toLowerCase(); // makes the mode easy to check

    if (mode == 'easy')
    {
        releaseRate = 35; // easy releases slowly
    }
    else if (mode == 'moderate')
    {
        releaseRate = 20; // moderate releases faster
    }
    else if (mode == 'hard')
    {
        releaseRate = 10; // hard releases fastest
    }
}

function randomColor()      // creates and returns a random color for a bubble
{
    var red = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);

    return 'rgb(' + red + ',' + green + ',' + blue + ')';
}
