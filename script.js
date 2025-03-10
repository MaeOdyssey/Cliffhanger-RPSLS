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
let previousPosition = 5;
const shipElement = document.getElementById("enterprise");
const replayButton = document.getElementById("replay-btn");

// Descriptions for player choices
const maneuverDescriptions = {
    integrity: "You activated the **Structural Integrity Field**, reinforcing shields!",
    dampener: "You engaged the **Inertial Dampeners**, stabilizing ship movement!",
    thrusters: "You fired the **Plasma Thrusters**, pushing the ship away from the singularity!",
    core: "You **ejected the Warp Core**, using its explosion to break free!",
    phase: "You initiated a **Subspace Phase Shift**, attempting to escape normal space!"
};

// AI responses that match player actions
const aiResponses = {
    integrity: [
        "The singularity counteracts with a **Gravitational Compression Wave**!",
        "The black hole intensifies its pull, testing the strength of your shields!"
    ],
    dampener: [
        "The singularity destabilizes space, disrupting your dampeners!",
        "A **Subspace Disturbance** causes unexpected turbulence!"
    ],
    thrusters: [
        "A **Gravity Well Fluctuation** resists your thrusters, slowing your movement!",
        "The singularity counters with **Inertial Drag**, making it harder to accelerate!"
    ],
    core: [
        "The singularity **pulls even harder**, consuming the expelled warp core!",
        "The explosion momentarily disrupts gravity, but the pull remains strong!"
    ],
    phase: [
        "The singularity reacts with **Spatial Distortions**, making escape difficult!",
        "A **Quantum Singularity Surge** tries to keep you anchored in normal space!"
    ]
};

// Function to Play the Game
function playGame(playerChoice) {
    if (playerChoice === "core" && coreEjected) {
        document.getElementById("player-action").innerText = "⚠️ The warp core has already been ejected! You must find another way!";
        return;
    }

    let aiChoice = determineAIResponse(playerChoice);
    let playerActionText = `${maneuverDescriptions[playerChoice]} `;
    let aiResponseText = aiResponses[playerChoice][Math.floor(Math.random() * aiResponses[playerChoice].length)];

    // Determine outcome
    let singularityUpdate = "";
    if (playerChoice === aiChoice) {
        singularityUpdate = "🚀 The battle is at a stalemate! No major movement occurs.";
    } else if (rules[playerChoice].includes(aiChoice)) {
        singularityUpdate = "✅ Your maneuver succeeds! The ship resists the singularity's pull!";
        playerScore++;

        if (playerChoice === "core") {
            shipPosition = Math.min(shipPosition + 2, maxPosition);
        } else {
            shipPosition++;
        }
    } else {
        singularityUpdate = "⚠️ The singularity gains the advantage, pulling the ship closer!";
        aiScore++;
        shipPosition--;
    }

    // If Core Ejection was used, hide the button
    if (playerChoice === "core") {
        coreEjected = true;
        const coreButton = document.getElementById("core-btn");
        if (coreButton) {
            coreButton.style.display = "none"; 
        }
    }

    // Random Space Anomalies (20% chance per turn)
    let displayPanel = document.getElementById("display-panel");
    displayPanel.classList.remove("flash", "shake"); // Reset effects
    let anomalyMessage = "No anomalies detected.";

    if (Math.random() < 0.2) {
        let anomalyType = Math.random();

        if (anomalyType < 0.33) {
            anomalyMessage = "🌌 **Warp Field Surge!** A subspace fluctuation gives you a free movement boost!";
            shipPosition = Math.min(shipPosition + 1, maxPosition);
            displayPanel.classList.add("flash"); // 🔥 Flash effect for power surge!
        } else if (anomalyType < 0.66) {
            anomalyMessage = "🌀 **Gravitational Surge!** The singularity pulls the ship in even closer!";
            shipPosition = Math.max(shipPosition - 1, minPosition);
            displayPanel.classList.add("shake"); // 🔥 Shake effect for intense gravity!
        } else {
            anomalyMessage = "🪨 **Cosmic Debris Detected.** No movement, but shields absorb the impact.";
        }

        // ✅ Make sure the anomaly message updates properly
        document.getElementById("anomaly-message").innerText = anomalyMessage;

        // ✅ Keep the anomaly message visible for 3 seconds before resetting
        setTimeout(() => {
            document.getElementById("anomaly-message").innerText = "No anomalies detected.";
            displayPanel.classList.remove("flash", "shake"); // Reset effects
        }, 3000);
    }

    // Move the Enterprise
    updateShipPosition();

    // ✅ Update Each Section Separately
    document.getElementById("player-action").innerText = playerActionText + "\n" + aiResponseText;
    document.getElementById("singularity-distance").innerText = singularityUpdate;
    document.getElementById("anomaly-message").innerText = anomalyMessage;

    // Check if the Enterprise is Lost
    if (shipPosition === minPosition) {
        document.getElementById("singularity-distance").innerText = "💀 The USS Enterprise is lost to the singularity! The mission is over.";
        document.getElementById("game").innerHTML = "<p>Game Over.</p>";
        replayButton.style.display = "block";
    }

    // Check if the Enterprise Escapes
    if (shipPosition === maxPosition) {
        document.getElementById("singularity-distance").innerText = "🖖 The USS Enterprise has broken free! 'Fascinating. Your logic was impeccable.'";
        document.getElementById("game").innerHTML = "<p>Mission Accomplished.</p>";
        replayButton.style.display = "block";
    }
}





// ✅ New Function: AI Chooses More Logical Responses
function determineAIResponse(playerMove) {
    const aiResponses = {
        integrity: ["thrusters", "gravitational_surge"], // If player strengthens shields, anomaly tries to push harder
        dampener: ["phase", "subspace_disruption"], // If player stabilizes ship, anomaly tries to destabilize space
        thrusters: ["integrity", "inertial_drag"], // If player boosts thrusters, anomaly resists movement
        core: ["gravitational_surge", "cosmic_disruption"], // If player ejects core, singularity pulls harder
        phase: ["dampener", "gravity_distortion"] // If player phase-shifts, anomaly tries to keep them in normal space
    };

    const possibleResponses = aiResponses[playerMove] || ["gravitational_surge"]; // Default fallback if something goes wrong
    return possibleResponses[Math.floor(Math.random() * possibleResponses.length)];
}

// Function to Move the Enterprise (Now Fixes Rotation)
function updateShipPosition() {
    const percentage = (shipPosition / maxPosition) * 90;
    shipElement.style.left = percentage + "%";

    // Determine direction of movement
    if (shipPosition > previousPosition) {
        shipElement.style.transform = "rotateY(180deg)"; // 🚀 Facing left (escaping)
    } else if (shipPosition < previousPosition) {
        shipElement.style.transform = "rotateY(0deg)"; // 🔥 Facing right (toward danger)
    }

    // Update the previous position
    previousPosition = shipPosition;
}

// Function to Reset the Game
function resetGame() {
    playerScore = 0;
    aiScore = 0;
    shipPosition = 5;
    coreEjected = false; // Reset core ejection state
    previousPosition = 5;
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
    updateShipPosition();
}
