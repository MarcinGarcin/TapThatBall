import{incrementAttempAndCheckHighScore} from "./profile.js";
import {populateTable} from "./ranking.js";

console.log("loaded");

const clickSound = new Audio("../../assets/kick1.wav");
clickSound.load()
const canvas = document.getElementById("GameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = parseInt(getComputedStyle(canvas).width);
canvas.height = parseInt(getComputedStyle(canvas).height);
ctx.font = "Bold 150px Courier New";
ctx.fillStyle = "#e4d5b7";

const button = document.getElementById("TryAgain");

// Ball properties
const ballSize = canvas.height / 8;
let ballX = canvas.width / 2 - ballSize / 2;
let ballY = canvas.height / 2 - ballSize / 2;
let ballVy = 0;
let ballVx = 0;
let rotation = 0;

// Game settings
let bounceFactor = 0.9;
const FPS = 120;
const FRAME_DELAY = 1000 / FPS;
let lastFrameTime = 0;
const gravity = 0.22;
const rotationFactor = 0.03;
const fractionFactor = 0.98;
const horizontalHitFactor = bounceFactor * gravity * 60;
const verticalHitFactor = bounceFactor * gravity * 120;
let isPlaying = false;
let gameOver = false;
let score = 0;
let gameText = "";
let scoreX = canvas.width / 2;
let scoreY = canvas.height / 3;


const img = new Image();
img.src = "../../assets/ball.png";

img.onload = function () {
    populateTable();

    calculateTextPosition()
    gameText = score.toString()
    ctx.fillText(gameText, scoreX, scoreY);
    ctx.drawImage(img, ballX, ballY, ballSize, ballSize);
};

button.addEventListener("click", function() {
    resetGame();
});

function resetGame() {

    gameOver = false;

    button.style.visibility = "hidden";
    incrementAttempAndCheckHighScore(score)



    ballX = canvas.width / 2 - ballSize / 2;
    ballY = canvas.height / 2 - ballSize / 2;


    ballVx = 0;
    ballVy = 0;
    rotation = 0;


    score = 0;


    gameText = score.toString();
    calculateTextPosition();


    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillText(gameText, scoreX, scoreY);
    ctx.drawImage(img, ballX, ballY, ballSize, ballSize);

    isPlaying = false;
    populateTable();
}


canvas.addEventListener("mousedown", function (event) {
    if (!isPlaying && !gameOver) {
        isPlaying = true;
        animate();
    }
    if (isPlaying && !gameOver) {
        checkIfBallWasClicked(event);
    }
});


function animate(timestamp) {
    if (!isPlaying) return;
    calculatePosition();
    calculateTextPosition();

    if (timestamp - lastFrameTime >= FRAME_DELAY) {
        lastFrameTime = timestamp;
        gameText = score.toString();


        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillText(gameText, scoreX, scoreY);


        rotation += ballVx * 0.05;

        ctx.save();
        ctx.translate(ballX + ballSize / 2, ballY + ballSize / 2);
        ctx.rotate(rotation);
        ctx.drawImage(img, -ballSize / 2, -ballSize / 2, ballSize, ballSize);
        ctx.restore();
    }

    requestAnimationFrame(animate);
}


function calculatePosition() {
    ballVy += gravity;
    ballVy *= fractionFactor;
    ballY += ballVy;
    ballX += ballVx;
    rotation += ballVx * rotationFactor;

    if (ballY >= canvas.height - ballSize*0.5) {
        isPlaying = false;
        gameOver = true;
        button.style.visibility = "visible";
    }
    if (ballY <= 0) {
        ballY = 0;
        ballVy *= -bounceFactor;
        clickSound.play()
    }
    if (ballX <= 0) {
        ballX = 0;
        ballVx *= -bounceFactor;
        clickSound.play()
    }
    if (ballX >= canvas.width - ballSize) {
        ballX = canvas.width - ballSize;
        ballVx *= -bounceFactor;
        clickSound.play()
    }
}

function checkIfBallWasClicked(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (x > ballX && x < ballX + ballSize && y > ballY && y < ballY + ballSize) {
        clickSound.play()
        score++;
        bounceFactor += 0.01;
        const clickOffset = x - (ballX + ballSize / 2);
        const side = clickOffset / (ballSize / 2);

        const clampedSide = Math.max(-1, Math.min(1, side));

        ballVy -= verticalHitFactor;
        ballVx -= horizontalHitFactor * clampedSide;
    }
}


function calculateTextPosition(){
    let scoreTextWidth = ctx.measureText(score.toString()).width;
    scoreX = canvas.width / 2 - scoreTextWidth / 2;
    scoreY = canvas.height / 3;
}
