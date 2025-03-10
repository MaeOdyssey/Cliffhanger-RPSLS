// Ensure script is running
console.log("Script is running!");

// Global variables
let shipPosition = 5;
const minPosition = 0;
const maxPosition = 11;
let coreEjected = false;
let previousPosition = 5;
const shipElement = document.getElementById("enterprise");
const blackHoleImg = document.getElementById("blackhole-img");
const viewscreen = document.getElementById("viewscreen");

// Function to Move the Enterprise & Update the Viewscreen
function updateShipPosition() {
    console.log("Updating ship position...");
    const percentage = (shipPosition / maxPosition) * 90;
    shipElement.style.left = percentage + "%";

    // ✅ Black Hole Scaling - Includes Event Horizon Death
    let blackHoleScale = 1 + ((maxPosition - shipPosition) * 0.2);
    if (blackHoleScale > 3) { 
        blackHoleScale = 3;
        endGame("💀 **Critical Singularity Collapse!** The Enterprise has been consumed by the black hole.");
        return;
    }  
    if (blackHoleScale < 0.5) {
        blackHoleScale = 0.5;
        endGame("🖖 **Escape Trajectory Achieved!** The Enterprise has successfully escaped the black hole.");
        return;
    }
    blackHoleImg.style.transform = `scale(${blackHoleScale})`;

    if (shipPosition > previousPosition || coreEjected) {
        shipElement.style.transform = "rotateY(180deg)";
    } else if (shipPosition < previousPosition) {
        shipElement.style.transform = "rotateY(0deg)";
    }

    previousPosition = shipPosition;

    // ✅ FIXED: Corrected distance calculation
    let distanceMessage = `🌌 Current Distance: ${shipPosition - minPosition} units`;
    
    // ✅ NEW: Distance Warnings
    if (shipPosition <= 2) {
        distanceMessage = "🚨 **EVENT HORIZON APPROACHING!** Gravitational forces increasing!";
    } else if (shipPosition >= 9) {
        distanceMessage = "✅ **SAFE ZONE NEARING!** Stabilization fields detected.";
    }
    
    document.getElementById("singularity-distance").innerText = distanceMessage;
}

// Function to Play the Game
function playGame(playerChoice) {
    console.log("playGame() function is running! Player chose:", playerChoice);

    if (playerChoice === "core" && coreEjected) {
        document.getElementById("player-action").innerText = "⚠️ The warp core has already been ejected!";
        return;
    }

    shipPosition += playerChoice === "core" ? 2 : 1;

    // ✅ Check for Random Space Anomalies (20% Chance)
    let anomalyMessage = "All systems stable.";
    let anomalyOccurred = false;

    if (Math.random() < 0.2) {
        anomalyOccurred = true;
        let anomalyType = Math.random();

        if (anomalyType < 0.33) {
            anomalyMessage = "🌌 **Subspace Distortion Detected!** Temporal fluctuations affecting navigation.";
            shipPosition = Math.min(shipPosition + 1, maxPosition);
        } else if (anomalyType < 0.66) {
            anomalyMessage = "🌀 **Gravitational Instability!** Uncontrolled singularity surge detected.";
            shipPosition = Math.max(shipPosition - 1, minPosition);
        } else {
            anomalyMessage = "🪨 **Localized Debris Field Encountered.** Shields absorbing impact.";
        }

        // ✅ NEW: Trigger Camera Shake When Anomalies Occur
        viewscreen.classList.add("shake");
        setTimeout(() => viewscreen.classList.remove("shake"), 500);
    }

    updateShipPosition();

    // ✅ Update LCARS Monitor Sections
    document.getElementById("player-action").innerText = `🛠️ Executed: ${playerChoice.toUpperCase()}`;
    document.getElementById("anomaly-message").innerText = anomalyMessage;

    // ✅ Show Acknowledge Button ONLY if an anomaly occurred
    let dismissButton = document.getElementById("dismiss-anomaly");
    if (anomalyOccurred) {
        dismissButton.style.display = "block";
    }
}

// Function to End the Game (For Death or Victory)
function endGame(message) {
    document.getElementById("singularity-distance").innerText = message;
    document.getElementById("game").innerHTML = "<p>Mission Over.</p>";
    document.getElementById("replay-btn").style.display = "block";

    // ✅ Disable all buttons so the player can't keep clicking
    let buttons = document.querySelectorAll("#controls button");
    buttons.forEach(btn => btn.disabled = true);
}

// Function to Dismiss Anomalies
function dismissAnomaly() {
    document.getElementById("anomaly-message").innerText = "All systems stable.";
    document.getElementById("dismiss-anomaly").style.display = "none";
}
