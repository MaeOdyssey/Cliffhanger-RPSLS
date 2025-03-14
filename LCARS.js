export class LCARS {
    static viewscreen = document.getElementById("viewscreen");
    static warningSections = document.querySelectorAll(".lcars-section");

    static updateUI(ship) {
        let distanceMessage = `🌌 Current Distance: ${ship.position} units`;
        if (ship.position <= 3) {
            console.log("💥 Viewscreen Damage Detected!");
            document.getElementById("cracked-screen").classList.add("damaged");
        } else {
            document.getElementById("cracked-screen").classList.remove("damaged");
        }
        
        if (ship.position <= 5) {
            console.log("🚨 RED ALERT TRIGGERED!");
            distanceMessage = "🚨 **RED ALERT! Critical Danger!**";
            this.viewscreen.classList.add("red-alert");
            this.warningSections.forEach(section => {
                section.classList.add("red-alert");
                section.classList.add("lcars-flash");
                section.style.color = "red"; // ✅ Ensures visibility
                section.style.fontWeight = "bold"; // ✅ Makes it pop
            });
        } else {
            console.log("🔵 RED ALERT DISENGAGED!");
            this.viewscreen.classList.remove("red-alert");
            this.warningSections.forEach(section => {
                section.classList.remove("lcars-flash");
                section.classList.remove("red-alert");
                section.style.color = "white"; // ✅ Resets to normal
                section.style.fontWeight = "normal";
            });
        }

        document.getElementById("singularity-distance").innerText = distanceMessage;
    }
}
