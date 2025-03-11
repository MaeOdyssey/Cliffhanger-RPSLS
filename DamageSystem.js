export class DamageSystem {
    constructor() {
        this.crackedScreen = document.getElementById("cracked-screen");
    }

    updateDamage(shipPosition) {
        if (shipPosition <= 3) {
            console.log("💥 Viewscreen Damage Detected!");
            this.crackedScreen.classList.add("damaged");
        } else {
            this.crackedScreen.classList.remove("damaged");
        }
    }
}
