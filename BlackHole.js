export class BlackHole {
    constructor() {
        this.element = document.getElementById("blackhole-img");
    }

    updateScale(shipPosition) {
        let scale = 1 + ((11 - shipPosition) * 0.2);
        this.element.style.transform = `scale(${scale})`;
    }
}
