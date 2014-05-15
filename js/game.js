/*global $, jQuery*/

// Global variables
var minimap = document.getElementById("minimap");
var exhibitCanvas = document.getElementById("exhibit");
var ectx = exhibitCanvas.getContext("2d");
var ctx = minimap.getContext("2d");
var minimapOffset = $("#minimap").offset();
var offsetX = minimapOffset.left;
var offsetY = minimapOffset.top;
var currentX = 20;
var currentY = 20;
var frameCount = 60;
var angle = 0;
var timer;
var points;
var currentFrame;
var purchasedTicket = "false"; // Player does not start out w/ticket

// Exhibits
var mammalIndex = ["giraffe", "lion", "monkey"];
var reptileIndex = ["snake", "komodo dragon", "crocodile"];
var birdIndex = ["eagle", "flamingo", "ostrich"];

// Player placement calculations
function linePoints(x1, y1, x2, y2, frames) {
    "use strict";
    var frame;
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
    for (frame = 0; frame < frames - 1; frame++) {
        a.push({
            x: x1 + (incrementX * frame),
            y: y1 + (incrementY * frame)
        });
    }
    a.push({
        x: x2,
        y: y2
    });
    return (a);
}

// Draws ingame objects except for the animals
function draw(x, y) {
    "use strict";
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
    ctx.fillStyle = "#6dd339"; // Green
    ctx.rect(39, 365, 80, 80);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    // Exhibit: Birds
    ctx.beginPath();
    ctx.fillStyle = "#682e1a"; // Brown
    ctx.rect(286, 51, 80, 80);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    // Concessions
    ctx.beginPath();
    ctx.fillStyle = "#3370d4"; // Turquoise
    ctx.rect(439, 348, 40, 40);
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
    ctx.arc(x, y, 10, 20, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();

    ctx.fillStyle = "#000";
    ctx.font = "13px Tahoma";
    ctx.fill();
    ctx.fillText("Tickets", 50, 105);
    ctx.fillText("Restrooms", 428, 245);
    ctx.fillText("Concessions", 423, 405);
    ctx.fillText("Exhibit: Mammals", 219, 328);
    ctx.fillText("Exhibit: Reptiles", 33, 462);
    ctx.fillText("Exhibit: Birds", 288, 147);
    ctx.fillText("You", x - 10, y + 25);
}

// Player movement anims
function animatePly() {
    "use strict";
    var point = points[currentFrame++];
    draw(point.x, point.y);
    if (currentFrame < points.length) {
        timer = setTimeout(animatePly, 1000 / 60);
    }
}

// Primary function for the animals
function zooKeeper() {
    "use strict";

    function ticketBooth() {
        if (currentX >= 50 && currentY >= 50 && currentX <= 89 && currentY <= 96 && purchasedTicket === "false") {
            $("#notify").html("You purchase a ticket from the booth.");
            purchasedTicket = "true"; // Allows player to progress
        } else if (currentX >= 50 && currentY >= 50 && currentX <= 89 && currentY <= 96 && purchasedTicket) {
            $("#notify").html("You already own a ticket!");
        }
    }

    function restrooms() {
        if (currentX >= 439 && currentY >= 191 && currentX <= 480 && currentY <= 230) {
            $("#notify").html("You use the restrooms.");
        }
    }

    function concessions() {
        var userPurchase;
        if (currentX >= 439 && currentY >= 348 && currentX <= 480 && currentY <= 395) {
            $("#notify").html("You use visit the concessions. What do you want to buy?");
            userPurchase = prompt("The concession somehow has every food and drink in the known universe.\nLeave empty to purchase nothing.");

            if (userPurchase === "") {
                $("#notify").html("You purchase nothing.");
            } else if (userPurchase !== null) {
                $("#notify").html("You purchase " + userPurchase + ".");
            }
        }
    }

    function exhibitMammals() {
        var imageGiraffe = document.getElementById("giraffe");
        var imageLion = document.getElementById("lion");
        var imageMonkey = document.getElementById("monkey");
        ectx.fillStyle = "#fff";

        var currentMammal = mammalIndex[Math.floor(Math.random() * mammalIndex.length)];
        if (currentX >= 232 && currentY >= 237 && currentX <= 310 && currentY <= 313 && purchasedTicket === "true") {
            $("#notify").html("You watch the mammal exhibit with others in the crowd. The mammal on display is a " + currentMammal + ".");
            if (currentMammal === "giraffe") {
                ectx.beginPath();
                ectx.fillRect(0, 0, 500, 500);
                ectx.drawImage(imageGiraffe, 150, 150);
                ectx.closePath();
            } else if (currentMammal === "lion") {
                ectx.beginPath();
                ectx.fillRect(0, 0, 500, 500);
                ectx.drawImage(imageLion, 150, 150);
                ectx.closePath();
            } else if (currentMammal === "monkey") {
                ectx.beginPath();
                ectx.fillRect(0, 0, 500, 500);
                ectx.drawImage(imageMonkey, 150, 150);
                ectx.closePath();
            }
        } else if (currentX >= 232 && currentY >= 237 && currentX <= 310 && currentY <= 313 && purchasedTicket === "false") {
            $("#notify").html("You must purchase a ticket before viewing this exhibit!");
        }
    }

    function exhibitBirds() {
        var imageFlamingo = document.getElementById("flamingo");
        var imageOstrich = document.getElementById("ostrich");
        var imageEagle = document.getElementById("eagle");
        ectx.fillStyle = "#fff";

        var currentBird = birdIndex[Math.floor(Math.random() * mammalIndex.length)];
        if (currentX >= 286 && currentY >= 51 && currentX <= 365 && currentY <= 138 && purchasedTicket === "true") {
            $("#notify").html("You watch the bird exhibit with others in the crowd. The bird on display is a(n) " + currentBird + ".");
            if (currentBird === "flamingo") {
                ectx.beginPath();
                ectx.fillRect(0, 0, 500, 500);
                ectx.drawImage(imageFlamingo, 150, 150);
                ectx.closePath();
            } else if (currentBird === "ostrich") {
                ectx.beginPath();
                ectx.fillRect(0, 0, 500, 500);
                ectx.drawImage(imageOstrich, 150, 150);
                ectx.closePath();
            } else if (currentBird === "eagle") {
                ectx.beginPath();
                ectx.fillRect(0, 0, 500, 500);
                ectx.drawImage(imageEagle, 150, 150);
                ectx.closePath();
            }
        } else if (currentX >= 286 && currentY >= 51 && currentX <= 365 && currentY <= 138 && purchasedTicket === "false") {
            $("#notify").html("You must purchase a ticket before viewing this exhibit!");
        }
    }

    function exhibitReptiles() {
        var imageSnake = document.getElementById("snake");
        var imageKomodo = document.getElementById("komodo");
        var imageCrocodile = document.getElementById("crocodile");
        ectx.fillStyle = "#fff";

        var currentReptile = reptileIndex[Math.floor(Math.random() * reptileIndex.length)];
        if (currentX >= 39 && currentY >= 367 && currentX <= 119 && currentY <= 450 && purchasedTicket === "true") {
            $("#notify").html("You watch the reptile exhibit with others in the crowd. The reptile on display is a " + currentReptile + ".");
            if (currentReptile === "snake") {
                ectx.beginPath();
                ectx.fillRect(0, 0, 500, 500);
                ectx.drawImage(imageSnake, 150, 150);
                ectx.closePath();
            } else if (currentReptile === "komodo dragon") {
                ectx.beginPath();
                ectx.fillRect(0, 0, 500, 500);
                ectx.drawImage(imageKomodo, 150, 150);
                ectx.closePath();
            } else if (currentReptile === "crocodile") {
                ectx.beginPath();
                ectx.fillRect(0, 0, 500, 500);
                ectx.drawImage(imageCrocodile, 150, 150);
                ectx.closePath();
            }
        } else if (currentX >= 39 && currentY >= 367 && currentX <= 119 && currentY <= 450 && purchasedTicket === "false") {
            $("#notify").html("You must purchase a ticket before viewing this exhibit!");
        }
    }

    // Call aforementioned functions
    ticketBooth();
    restrooms();
    concessions();
    exhibitMammals();
    exhibitBirds();
    exhibitReptiles();
}

// Allows player to click on minimap
function handleMouseDown(e) {
    "use strict";
    var mouseX;
    var mouseY;
    mouseX = parseInt(e.clientX - offsetX);
    mouseY = parseInt(e.clientY - offsetY);
    /*$("#downlog").html("Debug Coordinate: " + mouseX + " / " + mouseY); // For debugging */
    points = linePoints(currentX, currentY, mouseX, mouseY, frameCount);
    currentFrame = 0;
    currentX = mouseX;
    currentY = mouseY;
    animatePly();

    // Calling the primary function for each exhibit/location
    zooKeeper();
}

$("#minimap").mousedown(function (e) {
    "use strict";
    switch (event.which) {
    case 1: // Prevents right click movement
        handleMouseDown(e);
        break;
    }
});

draw(20, 20); // Starting position