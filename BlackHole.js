export class BlackHole {
    constructor() {
        this.element = document.getElementById("blackhole-img");
    }

    updateScale(shipPosition) {
        let scale = 1 + ((11 - shipPosition) * 0.07);
        this.element.style.transform = `translate(-50%, -50%) scale(${scale}) rotate(${shipPosition * 10}deg)`;
    }
}
