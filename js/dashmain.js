/* BDR Racing Dash Overlay main file

Author: Simon Thorpe
Version: 0.1

 */
var debugLog = false;
function dlog(message) {
    if (debugLog) {
        console.log(message);
    }
}

function dashMain() {
    var canvas = document.getElementById('dash');
    var updateId,
        previousDelta = 0,
        fpsLimit = 30;

    /* Resize the canvas to occupy the full page,
    by getting the widow width and height and setting it to canvas*/

    canvas.width  = window.innerWidth - 25;
    canvas.height = window.innerHeight -25;

    var ctx = canvas.getContext('2d');
        function update(currentDelta) {
            updateId = requestAnimationFrame(update);

            var delta = currentDelta - previousDelta;

            if (fpsLimit && delta < 1000 / fpsLimit) {
                return;
            }

            displayThrottle(canvas, ctx);
            displayBrake(canvas, ctx);
            displaySpeedo(canvas, ctx);
            displayGMeter(canvas, ctx);

            previousDelta = currentDelta;
        }
        // Start the loop to draw the display.
        requestAnimationFrame(update);
}

function displayThrottle(canvas, ctx) {
    dlog("Drawing Throttle display.");

    // Draw Throttle background as green.
    ctx.fillStyle = "green";
    ctx.fillRect(canvas.width - 100, canvas.height - 220, 30, 200);

    // TODO: Need to get this data from the race box.
    // Draw a grey box to cover the area that represents the throttle position.
    ctx.fillStyle = "grey";
    ctx.fillRect(canvas.width - 100, canvas.height - 220, 30, 100);

    // Draw a "T" to indicate Throttle
    ctx.font = "bold 33px Arial";
    ctx.fillStyle = "yellow";
    ctx.strokeStyle = 'black';
    ctx.fillText("T", canvas.width - 95, canvas.height - 30);
    ctx.strokeText("T", canvas.width - 95, canvas.height - 30);
}

function displayBrake(canvas, ctx) {
    dlog("Drawing Brake display.");

    // Draw Throttle background as green.
    ctx.fillStyle = "red";
    ctx.fillRect(canvas.width - 150, canvas.height - 220, 30, 200);

    // TODO: Need to get this data from the race box.
    // Draw a grey box to cover the area that represents the throttle position.
    ctx.fillStyle = "grey";
    ctx.fillRect(canvas.width - 150, canvas.height - 220, 30, 180);

    // Draw a "B" to indicate Brake
    ctx.font = "bold 33px Arial";
    ctx.fillStyle = "yellow";
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.fillText("B", canvas.width - 147, canvas.height - 30);
    ctx.strokeText("B", canvas.width - 147, canvas.height - 30);
}

function displayGMeter(canvas, ctx) {
    // Display a small circle graph indicating G's
    dlog("Drawing G meter");

    // G Meter background
    ctx.beginPath();
    ctx.arc(canvas.width -200, canvas.height -60, 40, 0, 2 * Math.PI, false);
    ctx.fillStyle = "grey";
    ctx.fill();

    ctx.lineWidth = 2;
    ctx.strokeStyle = 'white';
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(canvas.width -200, canvas.height -60, 20, 0, 2 * Math.PI, false);
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'white';
    ctx.stroke();
}

function displaySpeedo(canvas, ctx) {
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
    ctx.arc(canvas.width -300, canvas.height -120, 110, 0.7, revAmount, false);
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
    ctx.fillText("65", canvas.width - 350, canvas.height - 90);

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
    ctx.fillText("4", canvas.width - 403, canvas.height - 120);
    ctx.strokeText("4", canvas.width - 403, canvas.height -120);

    // 5
    ctx.fillText("5", canvas.width - 385, canvas.height - 170);
    ctx.strokeText("5", canvas.width - 385, canvas.height -170);

    // 6
    ctx.fillText("6", canvas.width - 347, canvas.height - 197);
    ctx.strokeText("6", canvas.width - 347, canvas.height -197);

    // 7
    ctx.fillText("7", canvas.width - 310, canvas.height - 205);
    ctx.strokeText("7", canvas.width - 310, canvas.height -205);

    // 8
    ctx.fillText("8", canvas.width - 265, canvas.height - 195);
    ctx.strokeText("8", canvas.width - 265, canvas.height -195);


}

