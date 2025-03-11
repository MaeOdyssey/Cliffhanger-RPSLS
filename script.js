import { Ship } from "./Ship.js";
import { BlackHole } from "./BlackHole.js";
import { LCARS } from "./LCARS.js";
import { DamageSystem } from "./DamageSystem.js";
import { AnomalyManager } from "./AnomalyManager.js";
import { EffectsManager } from "./EffectsManager.js";
import { Maneuver } from "./Maneuver.js";  // ✅ Import Maneuver!
import { checkWinLose, endGame } from "./GameLogic.js";  // ✅ Now script.js can use these functions



// 🚀 Create instances
const ship = new Ship();
const blackHole = new BlackHole();
const damageSystem = new DamageSystem();

function playMove(playerChoice) {
    console.log(`🎮 Player Chose: ${playerChoice}`);

    const maneuver = Maneuver.getManeuver(playerChoice);
    if (!maneuver) {
        console.error("❌ Invalid maneuver:", playerChoice);
        return;
    }

    // ✅ Fix: Ensure core button disappears after one use
    let coreButton = document.getElementById("core-btn");
    if (playerChoice === "core") {
        if (!coreButton.disabled) {
            coreButton.disabled = true;
            coreButton.innerText = "⚠️ Core Ejected!";
            console.log("💥 Warp core has been ejected!");
        } else {
            console.warn("❌ Warp core has already been ejected!");
            return; // 🚀 Prevents it from doing anything again!
        }
    }

    ship.move(maneuver.movement);
    document.getElementById("player-action").innerText = `🛠️ ${maneuver.name} - ${maneuver.effect}`;

    // ✅ Black Hole Takes Its Turn
    blackHole.takeAction(ship);

    // ✅ Trigger Anomalies
    AnomalyManager.triggerAnomaly(ship);

    // ✅ Check Win/Lose Conditions
    checkWinLose(ship);

    // ✅ Update UI, Damage Effects, & Scaling
    blackHole.updateScale(ship.position);
    LCARS.updateUI(ship);
    damageSystem.updateDamage(ship.position);
    EffectsManager.triggerRedAlert(ship.position);
}
window.playMove = playMove;
console.log("✅ playMove is now globally available!");
