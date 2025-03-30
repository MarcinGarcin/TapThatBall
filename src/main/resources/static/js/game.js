const canvas = document.getElementById("GameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = parseInt(getComputedStyle(canvas).width);
canvas.height = parseInt(getComputedStyle(canvas).height);

const img = new Image();
img.src = "../assets/ball.png";

let ballSize = canvas.height / 8;
let ballRotation = 0;
let ballX = canvas.width / 2 - ballSize / 2;
let ballY = canvas.height / 2 - ballSize / 2;
let gravity = 0.2;
let ballVy = 0;
let ballVx = 0;
let bounceFactor = 0.9;
let fractionFactor = 0.98;
let hitFactor = bounceFactor * gravity * 100;
let isPlaying = false;

img.onload = function () {
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
    if (!isPlaying) return;
    calculatePosition();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, ballX, ballY, ballSize, ballSize);
    requestAnimationFrame(animate);
}

function calculatePosition() {
    ballVy += gravity;
    ballVy *= fractionFactor;
    ballY += ballVy;
    ballX += ballVx;
    ballRotation = ballVy / 10000;

    if (ballY >= canvas.height - ballSize) {
        ballY = canvas.height - ballSize;
        ballVy *= -bounceFactor;
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
        if (ballVy < 0) {
            ballVy *= -1;
        } else {
            ballVy -= hitFactor;
        }
    }
}
