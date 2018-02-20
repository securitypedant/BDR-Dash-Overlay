/* BDR Racing Dash Overlay main file

Author: Simon Thorpe
Version: 0.1

 */

// CONSTANTS
var THROTTLE = 0,   // 0-100
    BRAKE = 1,      // 0 or 1
    SPEED = 2,      // 0-120
    REVS = 3,       // 0-8000
    G = 4,          // Unsure
    GEAR = 5;       // R, 1-5

// RANGE  CONSTANTS
var THROTTLE_RANGE = [0,100],
    SPEED_RANGE = [0, 120],
    REVS_RANGE = [0,8000],
    G_RANGE = [-1.5,1.5];

// RANGE DISPLAY CONSTANTS
var THROTTLE_DISPLAY_RANGE = [0,200],
    REVS_DISPLAY_RANGE = [1.13,5.2],
    G_DISPLAY_RANGE = [-1.5,1.5];

// convertRange( 328.17, [ 300.77, 559.22 ], [ 1, 10 ] );

var debugLog = false;

function dashMain() {
    var canvas = document.getElementById('dash');
    var updateId,
        previousDelta = 0,
        fpsLimit = 30;

    //alert (2*Math.PI); // = 6.28

    /* Resize the canvas to occupy the full page,
    by getting the window width and height and setting it to canvas. */
    canvas.width  = window.innerWidth - 25;
    canvas.height = window.innerHeight -25;

    var ctx = canvas.getContext('2d');
    function update(currentDelta) {
        updateId = requestAnimationFrame(update);

        var delta = currentDelta - previousDelta;
        if (fpsLimit && delta < 1000 / fpsLimit) {
            return;
        }

        // Get race data
        var raceData = getRaceData();

        // Update dash elements on screen.
        displayThrottle(canvas, ctx, raceData[THROTTLE]);
        displayBrake(canvas, ctx, raceData[BRAKE], raceData[BRAKE]);
        displaySpeedAndRevs(canvas, ctx, raceData[SPEED], raceData[REVS]);
        displayGMeter(canvas, ctx, raceData[G]);
        //displayGear(canvas, ctx, raceData[GEAR]);

        previousDelta = currentDelta;
    }
    // Start the loop to draw the display.
    requestAnimationFrame(update);
}

function displayThrottle(canvas, ctx, value) {
    dlog("Drawing Throttle display.");

    // Convert value to the scale of the display.
    var displayValue = (200 / value) * value;

    // Draw Throttle background as green.
    ctx.fillStyle = "green";
    ctx.fillRect(canvas.width - 100, canvas.height - 230, 30, 200);

    // TODO: Need to get this data from the race box.
    // Draw a grey box to cover the area that represents the throttle position.
    ctx.fillStyle = "grey";
    ctx.fillRect(canvas.width - 100, canvas.height - 230, 30, 200 - convertRange(value, THROTTLE_RANGE, THROTTLE_DISPLAY_RANGE));

    /*
    // Draw a "T" to indicate Throttle
    ctx.font = "bold 33px Arial";
    ctx.fillStyle = "yellow";
    ctx.strokeStyle = 'black';
    ctx.fillText("T", canvas.width - 95, canvas.height - 40);
    ctx.strokeText("T", canvas.width - 95, canvas.height - 40);
    */
}

function displayBrake(canvas, ctx, value) {
    dlog("Drawing Brake display.");

    if (value == 1) {
        // BRAKE ON
        ctx.fillStyle = "red";
        ctx.fillRect(canvas.width - 100, canvas.height - 40, 30, 30);
    } else {
        // BRAKE OFF
        ctx.fillStyle = "grey";
      ctx.fillRect(canvas.width - 100, canvas.height - 40, 30, 30);
    }

    /*
    // Draw a "B" to indicate Brake
    ctx.font = "bold 33px Arial";
    ctx.fillStyle = "yellow";
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.fillText("B", canvas.width - 147, canvas.height - 30);
    ctx.strokeText("B", canvas.width - 147, canvas.height - 30);
    */
}

function displayGMeter(canvas, ctx) {
    // Display a small circle graph indicating G's
    dlog("Drawing G meter");

    // G Meter background
    ctx.beginPath();
    ctx.arc(canvas.width -200, canvas.height -60, 40, 0, 2 * Math.PI, false);
    ctx.fillStyle = "grey";
    ctx.fill();

    ctx.lineWidth = 3;
    ctx.strokeStyle = 'white';
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(canvas.width -200, canvas.height -60, 20, 0, 2 * Math.PI, false);
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'white';
    ctx.stroke();

    // Draw lines in the circles
    ctx.beginPath();
    ctx.moveTo(canvas.width -200, canvas.height -100);
    ctx.lineTo(canvas.width -200, canvas.height -20);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(canvas.width -240, canvas.height -60);
    ctx.lineTo(canvas.width -160, canvas.height -60);
    ctx.stroke();

    // Draw the red dot to indicate G
    ctx.beginPath();
    ctx.arc(canvas.width -200, canvas.height -60, 5, 0, 2 * Math.PI, false);
    ctx.fillStyle = "red";
    ctx.fill();
}

function displaySpeedAndRevs(canvas, ctx, speed, revs) {
    dlog("Drawing Speedo display.");

    // Main speedo background
    ctx.beginPath();
    ctx.arc(canvas.width -300, canvas.height -120, 110, 0, 2 * Math.PI, false);
    ctx.fillStyle = "black";
    ctx.fill();

    // TODO: Need to get the revAmount from race box.
    // Revs indicator
    var revAmount = 4;

    ctx.beginPath();
    ctx.arc(canvas.width -300, canvas.height -120, 110, 0.7, convertRange(revs, REVS_RANGE, REVS_DISPLAY_RANGE), false);
    // ctx.arc(canvas.width -300, canvas.height -120, 110, 0.7, 1.2, false);
    ctx.lineTo((canvas.width -300), canvas.height -120);
    ctx.fillStyle = "green";
    ctx.fill();


    // Inner speedo background
    ctx.beginPath();
    ctx.arc(canvas.width -300, canvas.height -120, 80, 0, 2 * Math.PI, false);
    ctx.fillStyle = "black";
    ctx.fill();

    ctx.lineWidth = 3;
    ctx.strokeStyle = 'white';
    ctx.stroke();

    // Draw the speed
    ctx.font = "90px Arial";
    ctx.fillStyle = "yellow";
    // Figure out where to start drawing the text based on the size of number.
    var speedHeight = canvas.height - 90;
    if (speed < 10) {
        var speedLocation =      canvas.width - 325;
    } else if ( speed <100) {
        var speedLocation =      canvas.width - 350;
    } else {
        var speedLocation =      canvas.width - 365;
        ctx.font = "75px Arial";
        speedHeight = canvas.height - 95;
    }
    ctx.fillText(speed, speedLocation, speedHeight);

    // Draw the rev counter numbers
    ctx.font = "bold 28px Arial";
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'black';
    ctx.fillStyle = "white";

    // 1
    ctx.fillText("1", canvas.width - 310, canvas.height - 15);
    ctx.strokeText("1", canvas.width - 310, canvas.height -15);

    // 2
    ctx.fillText("2", canvas.width - 357, canvas.height - 30);
    ctx.strokeText("2", canvas.width - 357, canvas.height -30);

    // 3
    ctx.fillText("3", canvas.width - 392, canvas.height - 65);
    ctx.strokeText("3", canvas.width - 392, canvas.height -65);

    // 4
    ctx.fillText("4", canvas.width - 403, canvas.height - 113);
    ctx.strokeText("4", canvas.width - 403, canvas.height -113);

    // 5
    ctx.fillText("5", canvas.width - 389, canvas.height - 160);
    ctx.strokeText("5", canvas.width - 389, canvas.height -160);

    // 6
    ctx.fillText("6", canvas.width - 356, canvas.height - 192);
    ctx.strokeText("6", canvas.width - 356, canvas.height - 192);

    // 7
    ctx.fillText("7", canvas.width - 310, canvas.height - 205);
    ctx.strokeText("7", canvas.width - 310, canvas.height -205);

    // 8
    ctx.fillText("8", canvas.width - 265, canvas.height - 195);
    ctx.strokeText("8", canvas.width - 265, canvas.height -195);


}

function convertRange( value, inputRange, scaleToRange ) {
    return ( value - inputRange[ 0 ] ) * ( scaleToRange[ 1 ] - scaleToRange[ 0 ] ) / ( inputRange[ 1 ] - inputRange[ 0 ] ) + scaleToRange[ 0 ];
}

function dlog(message) {
    if (debugLog) {
        console.log(message);
    }
}