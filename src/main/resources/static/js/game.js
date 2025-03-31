const canvas = document.getElementById("GameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = parseInt(getComputedStyle(canvas).width);
canvas.height = parseInt(getComputedStyle(canvas).height);
ctx.font = "Bold 150px Courier New";
ctx.fillStyle = "#e4d5b7";

// Ball properties
const ballSize = canvas.height / 8;
let ballX = canvas.width / 2 - ballSize / 2;
let ballY = canvas.height / 2 - ballSize / 2;
let ballVy = 0;
let ballVx = 0;
let rotation = 0;

// Game settings
const gravity = 0.2;
const rotationFactor = 0.03;
const bounceFactor = 1;
const fractionFactor = 0.98;
const horizontalHitFactor = bounceFactor * gravity * 10;
const verticalHitFactor = bounceFactor * gravity * 100;
let isPlaying = false;
let score = 0;
let scoreX = canvas.width / 2;
let scoreY = canvas.height / 3;

const img = new Image();
img.src = "../assets/ball.png";

img.onload = function () {
    calculateTextPosition()
    ctx.fillText(score.toString(), scoreX, scoreY);
    ctx.drawImage(img, ballX, ballY, ballSize, ballSize);
};


canvas.addEventListener("mousedown", function (event) {
    if (!isPlaying) {
        isPlaying = true;
        animate();
    }
    checkIfBallWasClicked(event);
});


function animate() {
    calculatePosition();
    calculateTextPosition();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillText(score.toString(), scoreX, scoreY);

    ctx.save();
    ctx.translate(ballX + ballSize / 2, ballY + ballSize / 2);
    ctx.rotate(rotation);
    ctx.drawImage(img, -ballSize / 2, -ballSize / 2, ballSize, ballSize);
    ctx.restore();

    requestAnimationFrame(animate);
}


function calculatePosition() {
    ballVy += gravity;
    ballVy *= fractionFactor;
    ballY += ballVy;
    ballX += ballVx;
    rotation += ballVx * rotationFactor;

    if (ballY >= canvas.height - ballSize) {
        console.log("you lose")
    }
    if (ballY <= 0) {
        ballY = 0;
        ballVy *= -bounceFactor;
    }
    if (ballX <= 0) {
        ballX = 0;
        ballVx *= -bounceFactor;
    }
    if (ballX >= canvas.width - ballSize) {
        ballX = canvas.width - ballSize;
        ballVx *= -bounceFactor;
    }
}

function checkIfBallWasClicked(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (x > ballX && x < ballX + ballSize && y > ballY && y < ballY + ballSize) {
        score++;
        if (x >= ballX + ballSize * (1/3)) {
            ballVy -= verticalHitFactor;
            ballVx -= horizontalHitFactor;
        } else if (x <= ballX + ballSize * (2/3)) {
            ballVy -= verticalHitFactor;
            ballVx += horizontalHitFactor;
        } else {
            ballVy -= verticalHitFactor;
        }
    }
}

function calculateTextPosition(){
    scoreTextWidth = ctx.measureText(score.toString()).width;
    scoreX = canvas.width / 2 - scoreTextWidth / 2;
    scoreY = canvas.height / 3;
}
