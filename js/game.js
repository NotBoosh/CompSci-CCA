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
var purchasedTicket = "false"
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

function draw(x, y) {
    ctx.clearRect(0, 0, minimap.width, minimap.height);
    ctx.beginPath();
    ctx.fillStyle = "skyblue";
    ctx.strokeStyle = "gray";
    ctx.rect(x, y, 30, 20);
    ctx.fill();
    ctx.rect(50, 50, 40, 40);
    ctx.stroke()
}

function handleMouseDown(e) {
    mouseX = parseInt(e.clientX - offsetX);
    mouseY = parseInt(e.clientY - offsetY);
    $("#downlog").html("Coordinate: " + mouseX + " / " + mouseY);
    points = linePoints(currentX, currentY, mouseX, mouseY, frameCount);
    currentFrame = 0;
    currentX = mouseX;
    currentY = mouseY;
    animate();
    if (currentX >= 50 && currentY >= 50 && currentX <= 90 && currentY <= 89 && purchasedTicket === "false") {
        $("#notify").html("You purchase a ticket from the booth.");
        purchasedTicket = "true"
    }
}
$("#minimap").mousedown(function (e) {
    handleMouseDown(e)
});
draw(10, 10);