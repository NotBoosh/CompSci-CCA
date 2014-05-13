// Global variables
var minimap = document.getElementById("minimap");
var exhibitCanvas = document.getElementById("exhibit");
var ectx = exhibitCanvas.getContext("2d");
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
var mammalIndex = ["giraffe", "lion", "monkey"];
var reptileIndex = ["snake", "komodo dragon", "crocodile"];
var birdIndex = ["eagle", "flamingo", "ostrich"];


function animate() {
    var point = points[currentFrame++];
    draw(point.x, point.y);
    if (currentFrame < points.length) {
        timer = setTimeout(animate, 1000 / 60);
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
    ctx.fillStyle = "#00cccc"; // Turquoise
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
    ctx.fillStyle = "#3370d4"; // Blue
    ctx.rect(x, y, 30, 20);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

}

function handleMouseDown(e) {
    mouseX = parseInt(e.clientX - offsetX);
    mouseY = parseInt(e.clientY - offsetY);
    $("#downlog").html("Debug Coordinate: " + mouseX + " / " + mouseY); // For debugging
    points = linePoints(currentX, currentY, mouseX, mouseY, frameCount);
    currentFrame = 0;
    currentX = mouseX;
    currentY = mouseY;
    animate();

    // Calling the primary function for each exhibit/location
    zooKeeper();
}

function zooKeeper() {
    function ticketBooth() {
        if (currentX >= 50 && currentY >= 50 && currentX <= 90 && currentY <= 89 && purchasedTicket === "false") {
            $("#notify").html("You purchase a ticket from the booth.");
            purchasedTicket = "true" // Allows player to progress
        }
    }

    function restrooms() {
        if (currentX >= 439 && currentY >= 191 && currentX <= 480 && currentY <= 230) {
            $("#notify").html("You use the restrooms.");
        }
    }

    function concessions() {
        if (currentX >= 439 && currentY >= 348 && currentX <= 480 && currentY <= 395) {
            $("#notify").html("You use visit the concessions. What do you want to buy?");
            var userPurchase = prompt("The concession somehow has every food and drink in the known universe.");
            if (userPurchase != null){
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
			if (currentMammal === "giraffe"){
				ectx.beginPath();
				ectx.fillRect(0, 0, 500, 500);
				ectx.drawImage(imageGiraffe, 150, 150);
				ectx.closePath();
			}
			else if (currentMammal === "lion"){
			}
			else if (currentMammal === "lion"){
			}
        } else if (currentX >= 232 && currentY >= 237 && currentX <= 310 && currentY <= 313 && purchasedTicket === "false") {
            $("#notify").html("You must purchase a ticket before viewing this exhibit!");
        }
        // anim stuff here
    }

    function exhibitBirds() {
        var currentBird = birdIndex[Math.floor(Math.random() * mammalIndex.length)];
        if (currentX >= 286 && currentY >= 51 && currentX <= 365 && currentY <= 138 && purchasedTicket === "true") {
            $("#notify").html("You watch the bird exhibit with others in the crowd. The bird on display is a(n) " + currentBird + ".");
        } else if (currentX >= 286 && currentY >= 51 && currentX <= 365 && currentY <= 138 && purchasedTicket === "false") {
            $("#notify").html("You must purchase a ticket before viewing this exhibit!");
        }
        // anim stuff here
    }

    function exhibitReptiles() {
        var currentReptile = reptileIndex[Math.floor(Math.random() * reptileIndex.length)];
        if (currentX >= 39 && currentY >= 367 && currentX <= 119 && currentY <= 450 && purchasedTicket === "true") {
            $("#notify").html("You watch the reptile exhibit with others in the crowd. The reptile on display is a " + currentReptile + ".");
        } else if (currentX >= 39 && currentY >= 367 && currentX <= 119 && currentY <= 450 && purchasedTicket === "false") {
            $("#notify").html("You must purchase a ticket before viewing this exhibit!");
        }
        // anim stuff here
    }

    // Call aforementioned functions
    ticketBooth();
    restrooms();
    concessions();
    exhibitMammals();
    exhibitBirds();
    exhibitReptiles();
}

$("#minimap").mousedown(function (e) {
    handleMouseDown(e)
});

draw(10, 10);