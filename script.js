// Ensure script is running
console.log("Script is running!");

// Global variables
let shipPosition = 5;
const minPosition = 0;
const maxPosition = 11;
let coreEjected = false;
let previousPosition = 5;
const shipElement = document.getElementById("enterprise");

// Function to Move the Enterprise & Update the Viewscreen
function updateShipPosition() {
    console.log("Updating ship position...");
    const percentage = (shipPosition / maxPosition) * 90;
    shipElement.style.left = percentage + "%";

    let blackHoleScale = 1 + ((maxPosition - shipPosition) * 0.2); 
    if (blackHoleScale > 2.5) blackHoleScale = 2.5; 
    document.getElementById("blackhole-img").style.transform = `scale(${blackHoleScale})`;

    if (shipPosition > previousPosition || coreEjected) {
        shipElement.style.transform = "rotateY(180deg)";
    } else if (shipPosition < previousPosition) {
        shipElement.style.transform = "rotateY(0deg)";
    }

    previousPosition = shipPosition;
}

// Function to Play the Game
function playGame(playerChoice) {
    console.log("playGame() function is running! Player chose:", playerChoice);

    let singularityUpdate = "";
    if (playerChoice === "core" && coreEjected) {
        document.getElementById("player-action").innerText = "⚠️ The warp core has already been ejected!";
        return;
    }

    shipPosition += playerChoice === "core" ? 2 : 1;
    updateShipPosition();

    document.getElementById("player-action").innerText = `🛠️ Executed: ${playerChoice.toUpperCase()}`;
    document.getElementById("singularity-distance").innerText = singularityUpdate;
}

// Function to Dismiss Anomalies
function dismissAnomaly() {
    document.getElementById("anomaly-message").innerText = "All systems stable.";
    document.getElementById("dismiss-anomaly").style.display = "none";
}
