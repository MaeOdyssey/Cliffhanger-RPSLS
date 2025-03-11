export class Ship {
    constructor() {
        this.position = 5;
        this.element = document.getElementById("enterprise");
    }

    move(distance) {
        this.position += distance;
        console.log(`🚀 Ship moved to position ${this.position}`);
        this.updatePosition();
    }

    updatePosition() {
        const percentage = (this.position / 11) * 90;
        this.element.style.left = percentage + "%";
    }
}
