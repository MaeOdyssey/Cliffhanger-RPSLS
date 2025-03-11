import { AnomalyManager } from "./AnomalyManager.js";
export class BlackHole {
    constructor() {
        this.element = document.getElementById("blackhole-img");
    }

    updateScale(shipPosition) {
        let scale = 1 + ((11 - shipPosition) * 0.07);
        this.element.style.transform = `translate(-50%, -50%) scale(${scale}) rotate(${shipPosition * 10}deg)`;
    }

    // 🚀 New Feature: Black Hole Does Something Each Turn
    takeAction(ship) {
        let eventChance = Math.random();

        if (eventChance < 0.3) {
            ship.move(-1); // 📌 Slight pull toward the black hole
            console.log("🌌 The singularity pulls the ship closer!");
            document.getElementById("anomaly-message").innerText = "🌌 The black hole pulls you in!";
        } else if (eventChance < 0.5) {
            AnomalyManager.triggerAnomaly(ship); // ✅ Use AnomalyManager instead of Anomaly
        } else if (eventChance < 0.7) {
            let randomShift = Math.random() > 0.5 ? 1 : -1;
            ship.move(randomShift);
            console.log(`🔀 The singularity bends space-time! Ship moved ${randomShift} units.`);
            document.getElementById("anomaly-message").innerText =  `🔀 Space-time bends unpredictably! The ship is pulled ${randomShift > 0 ? "further away" : "closer"}.`;
        } else {
            console.log("✅ The singularity remains stable... for now.");
        }
    }
}
