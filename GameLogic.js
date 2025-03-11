export function checkWinLose(ship) {
    if (!ship) {
        console.error("❌ ERROR: ship is undefined in checkWinLose!");
        return;
    }

    if (ship.position <= 0) {
        endGame("💀 Critical Singularity Collapse! The Enterprise has been lost...", "blackhole-static.png");
    } else if (ship.position >= 11) {
        endGame("🖖 Warp Drive Engaged! The Enterprise has escaped!", "warp-nebula.png");
    }
}


export function endGame(message, image) {
    console.log(`🚀 GAME OVER: ${message}`);
    document.getElementById("viewscreen").style.backgroundImage = `url('images/${image}')`;
    document.getElementById("game-over-message").innerText = message;
    document.getElementById("game-over").style.display = "block"; // Show game over screen
}
