import { Ship } from "./Ship.js";
import { BlackHole } from "./BlackHole.js";
import { LCARS } from "./LCARS.js";
import { Anomaly } from "./Anomaly.js";
import { Maneuver } from "./Maneuver.js";

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

        // ✅ Fix: Ensure core button disappears after one use
        let coreButton = document.getElementById("core-btn");
        if (playerChoice === "core" && coreButton && !coreButton.disabled) {
            coreButton.disabled = true;
            coreButton.innerText = "⚠️ Core Ejected!";
            console.log("💥 Warp core has been ejected!");
        } else if (playerChoice === "core" && coreButton.disabled) {
            console.warn("❌ Warp core has already been ejected!");
            return; // 🚀 Prevents it from doing anything again!
        }

    ship.move(maneuver.movement);
    document.getElementById("player-action").innerText = `🛠️ ${maneuver.name} - ${maneuver.effect}`;

    // ✅ Black Hole Takes Its Turn
    blackHole.takeAction(ship);

    // ✅ Check Win/Lose Conditions
    checkWinLose();

    // ✅ Update UI and Black Hole Scaling
    blackHole.updateScale(ship.position);
    LCARS.updateUI(ship);
}

// ✅ Function to End the Game
function checkWinLose() {
    if (ship.position <= 0) {
        endGame("💀 Critical Singularity Collapse! The Enterprise has been lost...", "blackhole-static.png");
    } else if (ship.position >= 11) {
        endGame("🖖 Warp Drive Engaged! The Enterprise has escaped!", "warp-nebula.png");
    }
}
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
