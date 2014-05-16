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

// Animals
var animalImg = new Array();

// Mammals
animalImg[0] = new Image();
animalImg[0].src = "./img/mammals/giraffe.png";
animalImg[1] = new Image();
animalImg[1].src = "./img/mammals/lion.png";
animalImg[2] = new Image();
animalImg[2].src = "./img/mammals/monkey.png";

// Reptiles
animalImg[3] = new Image();
animalImg[3].src = "./img/reptiles/snake.png";
animalImg[4] = new Image();
animalImg[4].src = "./img/reptiles/crocodile.png";
animalImg[5] = new Image();
animalImg[5].src = "./img/reptiles/komodo.png";

// Birds
animalImg[6] = new Image();
animalImg[6].src = "./img/birds/flamingo.png";
animalImg[7] = new Image();
animalImg[7].src = "./img/birds/ostrich.png";
animalImg[8] = new Image();
animalImg[8].src = "./img/birds/eagle.png";

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

    // Theater
    ctx.beginPath();
    ctx.fillStyle = "#85bdc4"; // Light Blue
    ctx.rect(39, 204, 80, 80);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    // Concessions
    ctx.beginPath();
    ctx.fillStyle = "#e53fe5"; // Magenta
    ctx.rect(439, 348, 40, 40);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    // Restrooms
    ctx.beginPath();
    ctx.fillStyle = "#3370d4"; // Blue
    ctx.rect(439, 191, 40, 40);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    // Exit
    ctx.beginPath();
    ctx.fillStyle = "#909090"; // Grey
    ctx.rect(470, 19, 20, 20);
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

    // Location labels
    ctx.fillText("Tickets", 50, 105);
    ctx.fillText("Restrooms", 428, 245);
    ctx.fillText("Concessions", 423, 405);
    ctx.fillText("Exhibit: Mammals", 219, 328);
    ctx.fillText("Exhibit: Reptiles", 33, 462);
    ctx.fillText("Exhibit: Birds", 288, 147);
    ctx.fillText("Theater", 55, 300);
    ctx.fillText("Exit", 470, 53);
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
        var ticketType;
        if (currentX >= 50 && currentY >= 50 && currentX <= 89 && currentY <= 96 && purchasedTicket === "false") {
            $("#notify").html("What ticket do you want to buy?");
            ticketType = prompt("Enter the Numerical Value\n\n1. Regular\n2. Deluxe\n3. Children's");
            if (ticketType === "") {
                $("#notify").html("You purchase nothing.");
            } else if (ticketType === "1") {
                $("#notify").html("You purchase a regular ticket.");
                purchasedTicket = "true";
            } else if (ticketType === "2") {
                $("#notify").html("You purchase a deluxe ticket.");
                purchasedTicket = "true";
            } else if (ticketType === "3") {
                $("#notify").html("You purchase a children's ticket, you weirdo.");
                purchasedTicket = "true";
            } else {
                $("#notify").html("That's not a ticket.");
            }

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
            userPurchase = prompt("Enter the Numerical Value\n\n1. Soda\n2. Water\n3. Hamburger\n4. Corndog");

            if (userPurchase === "") {
                $("#notify").html("You purchase nothing.");
            } else if (userPurchase === "1") {
                $("#notify").html("You purchase a can of soda.");
            } else if (userPurchase === "2") {
                $("#notify").html("You purchase a bottle of water.");
            } else if (userPurchase === "3") {
                $("#notify").html("You purchase a hamburger.");
            } else if (userPurchase === "4") {
                $("#notify").html("You purchase a corndog.");
            } else {
                $("#notify").html("That's not an option.");
            }
        }
    }

    function exhibitMammals() {
        ectx.fillStyle = "#fff";

        var currentMammal = mammalIndex[Math.floor(Math.random() * mammalIndex.length)];
        if (currentX >= 232 && currentY >= 237 && currentX <= 310 && currentY <= 313 && purchasedTicket === "true") {
            $("#notify").html("You watch the mammal exhibit with others in the crowd. The mammal on display is a " + currentMammal + ".");
            if (currentMammal === "giraffe") {
                ectx.beginPath();
                ectx.fillRect(0, 0, 500, 500);
                ectx.drawImage(animalImg[0], 150, 150);
                ectx.closePath();
            } else if (currentMammal === "lion") {
                ectx.beginPath();
                ectx.fillRect(0, 0, 500, 500);
                ectx.drawImage(animalImg[1], 150, 150);
                ectx.closePath();
            } else if (currentMammal === "monkey") {
                ectx.beginPath();
                ectx.fillRect(0, 0, 500, 500);
                ectx.drawImage(animalImg[2], 150, 150);
                ectx.closePath();
            }
        } else if (currentX >= 232 && currentY >= 237 && currentX <= 310 && currentY <= 313 && purchasedTicket === "false") {
            $("#notify").html("You must purchase a ticket before viewing this exhibit!");
        }
    }

    function exhibitBirds() {
        ectx.fillStyle = "#fff";

        var currentBird = birdIndex[Math.floor(Math.random() * mammalIndex.length)];
        if (currentX >= 286 && currentY >= 51 && currentX <= 365 && currentY <= 138 && purchasedTicket === "true") {
            $("#notify").html("You watch the bird exhibit with others in the crowd. The bird on display is a(n) " + currentBird + ".");
            if (currentBird === "flamingo") {
                ectx.beginPath();
                ectx.fillRect(0, 0, 500, 500);
                ectx.drawImage(animalImg[6], 150, 150);
                ectx.closePath();
            } else if (currentBird === "ostrich") {
                ectx.beginPath();
                ectx.fillRect(0, 0, 500, 500);
                ectx.drawImage(animalImg[7], 150, 150);
                ectx.closePath();
            } else if (currentBird === "eagle") {
                ectx.beginPath();
                ectx.fillRect(0, 0, 500, 500);
                ectx.drawImage(animalImg[8], 150, 150);
                ectx.closePath();
            }
        } else if (currentX >= 286 && currentY >= 51 && currentX <= 365 && currentY <= 138 && purchasedTicket === "false") {
            $("#notify").html("You must purchase a ticket before viewing this exhibit!");
        }
    }

    function exhibitReptiles() {
        ectx.fillStyle = "#fff";

        var currentReptile = reptileIndex[Math.floor(Math.random() * reptileIndex.length)];
        if (currentX >= 39 && currentY >= 367 && currentX <= 119 && currentY <= 450 && purchasedTicket === "true") {
            $("#notify").html("You watch the reptile exhibit with others in the crowd. The reptile on display is a " + currentReptile + ".");
            if (currentReptile === "snake") {
                ectx.beginPath();
                ectx.fillRect(0, 0, 500, 500);
                ectx.drawImage(animalImg[3], 150, 150);
                ectx.closePath();
            } else if (currentReptile === "komodo dragon") {
                ectx.beginPath();
                ectx.fillRect(0, 0, 500, 500);
                ectx.drawImage(animalImg[5], 150, 150);
                ectx.closePath();
            } else if (currentReptile === "crocodile") {
                ectx.beginPath();
                ectx.fillRect(0, 0, 500, 500);
                ectx.drawImage(animalImg[4], 150, 150);
                ectx.closePath();
            }
        } else if (currentX >= 39 && currentY >= 367 && currentX <= 119 && currentY <= 450 && purchasedTicket === "false") {
            $("#notify").html("You must purchase a ticket before viewing this exhibit!");
        }
    }

    function theater() {
        if (currentX >= 39 && currentY >= 204 && currentX <= 120 && currentY <= 285 && purchasedTicket === "true") {
            $("#notify").html("You approach the theater. A weird show about backflipping giraffes is on display.");
            $(function () {
                var img = new Image();
                var backflipTimer = 0;

                var ang = 0;
                var fps = 1000 / 30;
                img.onload = function () {
                    var cache = this; // Cache the image element for later use
                    var interval = setInterval(function () {
                        ectx.save();
                        ectx.clearRect(0, 0, exhibitCanvas.width, exhibitCanvas.height); //clear the canvas
                        ectx.translate(cache.width, cache.height);
                        ectx.rotate(Math.PI / 180 * (ang += 5)); // Increment the angle and rotate
                        ectx.drawImage(img, -cache.width / 2, -cache.height / 2);
                        ectx.restore(); // Restore the canvas
                        backflipTimer += 1;
                        if (backflipTimer === 143) {
                            clearInterval(interval);
                        }
                    }, fps);
                };
                img.src = './img/mammals/giraffe.png'; //img
            });

        } else if (currentX >= 39 && currentY >= 204 && currentX <= 120 && currentY <= 285 && purchasedTicket === "false") {
            $("#notify").html("You must purchase a ticket before viewing this exhibit!");
        }

    }

    // Exiting the program
    function exit() {
        if (currentX >= 470 && currentY >= 19 && currentX <= 498 && currentY <= 38) {
            $("#notify").html("You walk back to the parking lot...");
            if (confirm("Leave the zoo?")) {
                close();
            } else {
                $("#notify").html("... but you decide to stay.");
            }
        }
    }

    // Call aforementioned functions
    ticketBooth();
    restrooms();
    concessions();
    exhibitMammals();
    exhibitBirds();
    exhibitReptiles();
    theater();
    exit()
}

// Allows player to click on minimap
function handleMouseDown(e) {
    "use strict";
    var mouseX;
    var mouseY;
    mouseX = parseInt(e.clientX - offsetX);
    mouseY = parseInt(e.clientY - offsetY);
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