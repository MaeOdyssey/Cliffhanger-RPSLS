import { Anomaly } from "./Anomaly.js";

export class AnomalyManager {
    static triggerAnomaly(ship) {
        let anomalyChance = Math.random();
        
        if (anomalyChance < 0.3) {
            const anomaly = Anomaly.randomAnomaly();
            ship.move(anomaly.movement);
            console.log(`⚠️ Unstable Space Event: ${anomaly.name}`);
            document.getElementById("anomaly-message").innerText = `⚠️ Space Distortion: ${anomaly.name}`;
        } else {
            document.getElementById("anomaly-message").innerText = "No anomalies detected";
        }
    }
}
