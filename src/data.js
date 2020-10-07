import builder from "./role.builder";
import harvester from "./role.harvester";
import upgrader from "./role.upgrader";

export default {
    CREEPS: [
        {
            role: "harvester",
            count: 10,
            spawnName: "Spawn1",
            body: [WORK, CARRY, MOVE, MOVE]
        },
        {
            role: "upgrader",
            count: 5,
            spawnName: "Spawn1",
            body: [WORK, CARRY, MOVE, MOVE]
        },
        {
            role: "builder",
            count: 5,
            spawnName: "Spawn1",
            body: [WORK, CARRY, MOVE, MOVE]
        }
    ],
    ROLE_MODULES: {
        "builder": builder,
        "harvester": harvester,
        "upgrader": upgrader
    }
}