import { Ship } from "./Ship.js";
import { BlackHole } from "./BlackHole.js";
import { LCARS } from "./LCARS.js";
import { Anomaly } from "./Anomaly.js";
import { Maneuver } from "./Maneuver.js";

// 🚀 Debug: Confirm Script is Running
console.log("🚀 Script is running!");

// 🚀 Create instances
const ship = new Ship();
const blackHole = new BlackHole();

// 🎮 Handle player moves
function playMove(playerChoice) {
    console.log(`🎮 Player Chose: ${playerChoice}`);

    const maneuver = Maneuver.getManeuver(playerChoice);
    if (!maneuver) {
        console.error("❌ Invalid maneuver:", playerChoice);
        return;
    }

    ship.move(maneuver.movement);
    console.log(`🛠️ Executed ${maneuver.name}: ${maneuver.effect}`);
    document.getElementById("player-action").innerText = `🛠️ ${maneuver.name} - ${maneuver.effect}`;

    // ✅ Check for random anomaly (20% Chance)
    if (Math.random() < 0.2) {
        const anomaly = Anomaly.randomAnomaly();
        ship.move(anomaly.movement);
        console.log(`⚡ Anomaly Detected: ${anomaly.name} - ${anomaly.effect}`);
        LCARS.displayAnomaly(anomaly.name, anomaly.effect);
    }

    // ✅ Check Win/Lose Conditions
    if (ship.position <= 0) {
        endGame("💀 Critical Singularity Collapse! The Enterprise has been lost...", "blackhole-static.png");
        return;
    }

    if (ship.position >= 11) {
        endGame("🖖 Warp Drive Engaged! The Enterprise has escaped!", "warp-nebula.png");
        return;
    }

    // ✅ Update UI and Black Hole Scaling
    blackHole.updateScale(ship.position);
    LCARS.updateUI(ship);
}

// ✅ Function to End the Game
function endGame(message, newImage) {
    console.log("🔥 GAME OVER:", message);
    document.getElementById("singularity-distance").innerText = message;
    document.getElementById("game-container").innerHTML += "<p>Mission Over.</p>";
    document.getElementById("replay-btn").style.display = "block";

    let buttons = document.querySelectorAll("#controls button");
    buttons.forEach(btn => btn.disabled = true);

    document.getElementById("blackhole-img").src = `images/${newImage}`;
}

// ✅ Make `playMove()` available globally
window.playMove = playMove;
