import { AnomalyManager } from "./AnomalyManager.js";
export class BlackHole {
    constructor() {
        this.element = document.getElementById("blackhole-img");
    }

    updateScale(shipPosition) {
        let scale = 1 + ((11 - shipPosition) * 0.07);
        this.element.style.transform = `translate(-50%, -50%) scale(${scale}) rotate(${shipPosition * 10}deg)`;
    }

    takeAction(ship) {
        console.log("🌀 Black Hole Taking Action...");
    
        let eventChance = Math.random();
        let multiActionChance = Math.random();
    
        if (ship.position <= 6) {
            console.log("🚨 RED ALERT TRIGGERED! The singularity is dangerously close!");
            EffectsManager.triggerRedAlert(ship.position);
        }
    
        // 🔥 NEW: Sometimes take multiple actions!
        if (multiActionChance < 0.4) {
            console.log("🌀 The singularity is destabilizing! Taking multiple actions...");
            ship.move(-1);
            document.getElementById("anomaly-message").innerText = "🌌 The black hole intensifies!";
            setTimeout(() => AnomalyManager.triggerAnomaly(ship), 1000);
        } else {
            if (eventChance < 0.3) {
                ship.move(-1);
                console.log("🌌 The singularity PULLS the ship closer!");
                document.getElementById("anomaly-message").innerText = "🌌 The black hole pulls you in!";
            } else if (eventChance < 0.6) {
                console.log("⚠️ An anomaly is triggered!");
                AnomalyManager.triggerAnomaly(ship);
            } else {
                console.log("✅ The singularity remains stable... for now.");
            }
        }
    }
    
}
