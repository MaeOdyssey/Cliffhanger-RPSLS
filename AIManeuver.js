export class AIManeuver {
    static aiMoves = [
        { name: "Gravitational Surge", effect: "The black hole distorts space-time!", movement: -1 },
        { name: "Temporal Ripple", effect: "A strange ripple disrupts ship sensors!", movement: 0 },
        { name: "Singularity Surge", effect: "The event horizon destabilizes!", movement: -2 },
        { name: "Quantum Flux", effect: "A burst of radiation forces an emergency course correction!", movement: 1 }
    ];

    static getRandomMove() {
        return this.aiMoves[Math.floor(Math.random() * this.aiMoves.length)];
    }
}
