import { getUserLocation } from "./location.js";
import { getOrCreateUniqueId } from "./uniqueId.js";

let attempsCounter = 0;
let highScore = 0;
const attempsElement = document.getElementById('attempsAmount');
const countryElement = document.getElementById('country');
const highScoreElement = document.getElementById("highScore");
const uniqueIdElement = document.getElementById("uniqueId");
const userElement = document.getElementById("username");
const uniqueId = getOrCreateUniqueId();
let username = ""; // Store username in a variable accessible to both functions

document.getElementById("startGame").addEventListener("click", function() {
    username = document.getElementById("nameInput").value.trim();

    if (username) {
        document.getElementById("usernameForm").style.display = "none";
        userElement.innerText = username.toUpperCase();
    } else {
        alert("Please enter your name!");
    }

    getUserLocation()
        .then(country => {
            if (countryElement) {
                countryElement.textContent = country;
            }
            console.log('Pobrano kraj:', country);
        });

    attempsElement.textContent = "Attemps: " + 0;
    highScoreElement.textContent = "high score: " + highScore;
    uniqueIdElement.innerText = uniqueId;
});

export function incrementAttempAndCheckHighScore(score) {
    attempsCounter++;
    attempsElement.textContent = "Attemps: " + attempsCounter;
    if (score > highScore) {
        highScore = score;
        highScoreElement.textContent = "high score: " + highScore;
        sendHighScoreUpdate(); // Call the function to send updated high score
    }
}

function sendHighScoreUpdate() {
    const country = countryElement.textContent;
    const date = new Date().toISOString().slice(0, 10);

    const dataToSend = {
        name: username,
        country: country,
        date: date,
        score: highScore,
        uniqueId: uniqueId
    };

    fetch('http://localhost:8080/api/Save', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            console.log('High score updated successfully!');
        })
        .catch(error => {
            console.error('Error updating high score:', error);
        });
}
