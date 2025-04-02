import {getUserLocation} from "./location.js";

document.getElementById("startGame").addEventListener("click", function() {
    const username = document.getElementById("nameInput").value.trim();
    const country = getUserLocation();
    //const attempsCounter
    //const highScoreCounter = document.getElementById("highScore");
    //const uniqueId = document.getElementById("uniqueId");


    if (username) {
        document.getElementById("usernameForm").style.display = "none";
        document.getElementById("username").innerText = username.toUpperCase();
    } else {
        alert("Please enter your name!");
    }
    if(country){
        document.getElementById("country").innerText = country;
        console.log(country);
    }

});
