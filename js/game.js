// Global variables
var minimap = document.getElementById("minimap");
var exhibit = document.getElementById("exhibit");
var ctx = minimap.getContext("2d");
var minimapOffset = $("#minimap").offset();
var offsetX = minimapOffset.left;
var offsetY = minimapOffset.top;
var currentX = 10;
var currentY = 10;
var frameCount = 60;
var timer;
var points;
var currentFrame;
var purchasedTicket = "false";

// Exhibits | To-do: Select a random value from this array
// and display that animal's anim in the "exhibit"
var currentMammal = ["giraffe", "lion", "monkey"];
var currentReptile = ["snake", "komodo", "gator"];
var currentBird = ["eagle", "flamingo", "ostrich"];


function animate() {
    var point = points[currentFrame++];
    draw(point.x, point.y);
    if (currentFrame < points.length) {
        timer = setTimeout(animate, 1000 / 60)
    }
}

function linePoints(x1, y1, x2, y2, frames) {
    var dx = x2 - x1;
    var dy = y2 - y1;
    var length = Math.sqrt(dx * dx + dy * dy);
    var incrementX = dx / frames;
    var incrementY = dy / frames;
    var a = new Array();
    a.push({
        x: x1,
        y: y1
    });
    for (var frame = 0; frame < frames - 1; frame++) {
        a.push({
            x: x1 + (incrementX * frame),
            y: y1 + (incrementY * frame)
        })
    }
    a.push({
        x: x2,
        y: y2
    });
    return (a)
}

// To-do: Concessions, birds
function draw(x, y) {
    ctx.clearRect(0, 0, minimap.width, minimap.height);
    ctx.strokeStyle = "gray";

    // Ticket Booth
    ctx.beginPath();
    ctx.fillStyle = "#ff9500"; // Orange-Yellow
    ctx.rect(50, 50, 40, 40);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    // Exhibit: Mammals
    ctx.beginPath();
    ctx.fillStyle = "#c82124"; // Red
    ctx.rect(230, 230, 80, 80);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    // Exhibit: Reptiles
    ctx.beginPath();
    ctx.fillStyle = "#33cc00"; // Green
    ctx.rect(39, 365, 80, 80);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    // Restrooms
    ctx.beginPath();
    ctx.fillStyle = "#e53fe5"; // Magenta
    ctx.rect(439, 191, 40, 40);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    // Player -- last so it gains draw priority
    ctx.beginPath();
    ctx.fillStyle = "#3370d4"; // Blue
    ctx.rect(x, y, 30, 20);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

}

function handleMouseDown(e) {
    mouseX = parseInt(e.clientX - offsetX);
    mouseY = parseInt(e.clientY - offsetY);
    $("#downlog").html("Debug Coordinate: " + mouseX + " / " + mouseY);
    points = linePoints(currentX, currentY, mouseX, mouseY, frameCount);
    currentFrame = 0;
    currentX = mouseX;
    currentY = mouseY;
    animate();

    // We run the functions for each exhibit/location
    ticketBooth();
    restrooms();
    exhibitMammals();
    exhibitReptiles();
}

function ticketBooth() {
    if (currentX >= 50 && currentY >= 50 && currentX <= 90 && currentY <= 89 && purchasedTicket === "false") {
        $("#notify").html("You purchase a ticket from the booth.");
        purchasedTicket = "true"
    }
}

function restrooms() {
    if (currentX >= 439 && currentY >= 191 && currentX <= 480 && currentY <= 230) {
        $("#notify").html("You use the restrooms.");
    }
}

function exhibitMammals() {
    if (currentX >= 232 && currentY >= 237 && currentX <= 310 && currentY <= 313 && purchasedTicket === "true") {
        $("#notify").html("You watch the mammal exhibit with others in the crowd. The animal on display is a ");
    } else if (currentX >= 232 && currentY >= 237 && currentX <= 310 && currentY <= 313 && purchasedTicket === "false") {
        $("#notify").html("You must purchase a ticket before viewing this exhibit!");
    }
    // anim stuff here
}

function exhibitReptiles() {
    if (currentX >= 39 && currentY >= 367 && currentX <= 119 && currentY <= 450 && purchasedTicket === "true") {
        $("#notify").html("You watch the reptile exhibit with others in the crowd. The animal on display is a ");
    } else if (currentX >= 39 && currentY >= 367 && currentX <= 119 && currentY <= 450 && purchasedTicket === "false") {
        $("#notify").html("You must purchase a ticket before viewing this exhibit!");
    }
    // anim stuff here
}

$("#minimap").mousedown(function(e) {
    handleMouseDown(e)
});

draw(10, 10);