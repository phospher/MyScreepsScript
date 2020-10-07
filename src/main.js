import createRole from "./create.role";
import data from "./data";
import memory from "./memory";
import tower from "./tower";


export function loop() {

    if (Game.spawns["Spawn1"].room.controller.safeModeAvailable) {
        Game.spawns["Spawn1"].room.controller.activateSafeMode();
    }

    createRole.createBatch(data.CREEPS);

    for (let roomName in Game.rooms) {
        tower.process(roomName);
    }

    for (let name in Game.creeps) {
        const creep = Game.creeps[name];
        if (data.ROLE_MODULES[creep.memory.role]) {
            data.ROLE_MODULES[creep.memory.role].run(creep);
        }
    }

    memory.clear();
}