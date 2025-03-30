const canvas = document.getElementById("GameCanvas");
const ctx = canvas.getContext("2d");
let ballX = 227;
let ballY = 200;
let gravity = 0.1;
let ballVy = 0;
let ballVx = 2;
let bounceFactor = 0.9;

canvas.width = 550;
canvas.height = 900;


const img = new Image();
img.src = "../assets/ball.png";

img.onload = function() {
    animate();
};

function animate() {
    calculatePosition();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(img, ballX, ballY);

    requestAnimationFrame(animate);
}

function calculatePosition() {
    ballVy += gravity;
    ballY += ballVy;

    ballX += ballVx;


    if (ballY >= 804) {
        ballY = 804;
        ballVy *= -bounceFactor;
    }


    if (ballX <= 0) {
        ballX = 0;
        ballVx *= -bounceFactor;
    }


    if (ballX >= 448) {
        ballX = 448;
        ballVx *= -bounceFactor;
    }
}
