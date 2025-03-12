export function checkWinLose(ship) {
    if (ship.position <= 0) {
        document.getElementById("viewscreen").style.background = "url('images/event_horizon.png') no-repeat center center/cover";
        document.getElementById("game-over").style.display = "block";
        document.getElementById("game-over-message").innerText = "The ship has been consumed by the singularity...";
        console.log("💀 GAME OVER - The ship was lost to the event horizon!");
    } else if (ship.position >= 10) {
        document.getElementById("viewscreen").style.background = "url('images/safe_space.png') no-repeat center center/cover";
        document.getElementById("game-over").style.display = "block";
        document.getElementById("game-over-message").innerText = "You successfully escaped!";
        console.log("🚀 SUCCESS - The ship has escaped!");
    }
}


export function endGame(message, image) {
    console.log(`🚀 GAME OVER: ${message}`);
    document.getElementById("viewscreen").style.backgroundImage = `url('images/${image}')`;
    document.getElementById("game-over-message").innerText = message;
    document.getElementById("game-over").style.display = "block"; // Show game over screen
}
