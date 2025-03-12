export class EffectsManager {
    static triggerRedAlert(shipPosition) {
        let viewscreen = document.getElementById("viewscreen");
        let warningSections = document.querySelectorAll(".lcars-section");

        if (shipPosition <= 7) {
            if (!viewscreen.classList.contains("red-alert")) { // ✅ Prevents unnecessary re-triggering
                console.log("🚨 RED ALERT TRIGGERED!");
                viewscreen.classList.add("red-alert");
                warningSections.forEach(section => section.classList.add("lcars-flash"));
            }
        } else {
            if (viewscreen.classList.contains("red-alert")) { // ✅ Only logs if it was actually engaged
                console.log("🔵 RED ALERT DISENGAGED!");
            }
            viewscreen.classList.remove("red-alert");
            warningSections.forEach(section => section.classList.remove("lcars-flash"));
        }
    }

    static triggerScreenShake() {
        let viewscreen = document.getElementById("viewscreen");
        viewscreen.classList.add("shake");
        setTimeout(() => viewscreen.classList.remove("shake"), 500);
    }
}
