export class Maneuver {
    static maneuvers = {
        "thrusters": { name: "Thrusters", movement: 1, effect: "Propelled ship forward." },
        "shields": { name: "Raise Shields", movement: 0, effect: "Defensive measure activated." },
        "core": { name: "Eject Warp Core", movement: 2, effect: "Massive energy burst—ship moves faster!" },
        "dampener": { name: "Inertial Dampeners", movement: -1, effect: "Resisted singularity pull." },
        "phase": { name: "Phase Shift", movement: 0, effect: "Temporarily avoided singularity effects." }
    };

    static getManeuver(name) {
        return this.maneuvers[name] || null;
    }
}
