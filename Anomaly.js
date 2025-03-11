export class Anomaly {
    static randomAnomaly() {
        const anomalies = [
            { name: "🌌 Subspace Distortion", effect: "Temporal fluctuations affecting navigation.", movement: 1 },
            { name: "🌀 Gravitational Instability", effect: "Uncontrolled singularity surge detected.", movement: -1 },
            { name: "🪨 Localized Debris Field", effect: "Shields absorbing impact.", movement: 0 },
        ];

        return anomalies[Math.floor(Math.random() * anomalies.length)];
    }
}
