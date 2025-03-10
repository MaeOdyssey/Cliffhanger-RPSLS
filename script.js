// List of maneuvers
const maneuvers = ["integrity", "dampener", "thrusters", "core", "phase"];

// Maneuver Rules (Star Trek Logic!)
const rules = {
    integrity: ["thrusters", "core"], // Shields hold against thrust & mass ejection
    dampener: ["phase", "integrity"], // Dampeners neutralize subspace shift & stabilizers
    thrusters: ["dampener", "core"], // Plasma thrust overrides dampeners & pushes debris
    core: ["integrity", "dampener"], // Ejecting mass breaks free of shields & dampener effects
    phase: ["thrusters", "core"], // Subspace shift bypasses physical forces
};

// Game State
let playerScore = 0;
let aiScore = 0;
let shipPosition = 5;  // Enterprise starts in the middle
const minPosition = 0;  // Falls into the black hole
const maxPosition = 11; // Safely escapes gravity
let coreEjected = false;
const shipElement = document.getElementById("enterprise");
const replayButton = document.getElementById("replay-btn");

// Function to Play the Game
function playGame(playerChoice) {
    if (playerChoice === "core" && coreEjected) {
        document.getElementById("result").innerText = "⚠️ The warp core has already been ejected! You must find another way!";
        return;
    }

    const aiChoice = maneuvers[Math.floor(Math.random() * maneuvers.length)];
    
    let resultText = `You attempted **${playerChoice.toUpperCase()}**. The singularity countered with **${aiChoice.toUpperCase()}**. `;

    if (playerChoice === aiChoice) {
        resultText += "It's a stalemate! 🚀 The ship remains in its current trajectory!";
    } else if (rules[playerChoice].includes(aiChoice)) {
        resultText += "✅ Success! The ship resists the pull of the singularity!";
        playerScore++;
        
        // If Core Ejection was used, move 2 steps away instead of 1
        if (playerChoice === "core") {
            shipPosition = Math.min(shipPosition + 2, maxPosition); // Ensures we don’t go past maxPosition
        } else {
            shipPosition++;  // Normal moves only go 1 step
        }
    } else {
        resultText += "⚠️ Failure! The gravitational forces pull the ship closer!";
        aiScore++;
        shipPosition--;  // Move closer to the black hole
    }

    // If Core Ejection was used, hide the button
    if (playerChoice === "core") {
        coreEjected = true;
        const coreButton = document.getElementById("core-btn");
        if (coreButton) {
            coreButton.style.display = "none"; // Button disappears!
        }
    }

    // Move the Enterprise
    updateShipPosition();

    // Check if the Enterprise is Lost
    if (shipPosition === minPosition) {
        document.getElementById("result").innerText = "💀 The USS Enterprise is lost to the singularity! The mission is over.";
        document.getElementById("game").innerHTML = "<p>Game Over.</p>";
        replayButton.style.display = "block"; // Show Replay Button
    }

    // Check if the Enterprise Escapes
    if (shipPosition === maxPosition) {
        document.getElementById("result").innerText = "🖖 The USS Enterprise has broken free! 'Fascinating. Your logic was impeccable.'";
        document.getElementById("game").innerHTML = "<p>Mission Accomplished.</p>";
        replayButton.style.display = "block"; // Show Replay Button
    }
}

// Function to Move the Enterprise (Now Includes Rotation)
function updateShipPosition() {
    const percentage = (shipPosition / maxPosition) * 90;
    shipElement.style.left = percentage + "%";

    // Rotate ship based on movement direction
    if (shipPosition > 5) {
        shipElement.style.transform = "rotateY(180deg)"; // 🚀 Facing left (escaping)
    } else {
        shipElement.style.transform = "rotateY(0deg)"; // 🔥 Facing right (toward danger)
    }
}

// Function to Reset the Game
function resetGame() {
    playerScore = 0;
    aiScore = 0;
    shipPosition = 5;
    coreEjected = false; // Reset core ejection state
    document.getElementById("result").innerText = "";
    document.getElementById("game").innerHTML = `
        <p><strong>Choose a Maneuver:</strong></p>
        <button onclick="playGame('integrity')">🛡️ Integrity Field Boost</button>
        <button onclick="playGame('dampener')">🚀 Inertial Dampener Override</button>
        <button onclick="playGame('thrusters')">🔥 Plasma Burst Thrusters</button>
        <button id="core-btn" onclick="playGame('core')">⚠️ Emergency Core Ejection</button>
        <button onclick="playGame('phase')">✨ Subspace Phase Shift</button>
    `;
    replayButton.style.display = "none"; // Hide Replay Button

    // Re-add the Enterprise movement
    updateShipPosition();
}
