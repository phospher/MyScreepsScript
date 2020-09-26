import builder from "./role.builder";
import harvester from "./role.harvester";
import upgrader from "./role.upgrader";
import createRole from "./create.role";
import { create } from "lodash";

export function loop() {

    createRole.create("harvester", 2, "Spawn1", [WORK, CARRY, MOVE, MOVE]);

    createRole.create("upgrader", 2, "Spawn1", [WORK, CARRY, MOVE]);

    createRole.create("builder", 5, "Spawn1", [WORK, CARRY, MOVE, MOVE]);

    for (let name in Game.creeps) {
        const creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            harvester.run(creep);
        }
        if (creep.memory.role == 'upgrader') {
            upgrader.run(creep);
        }
        if (creep.memory.role == 'builder') {
            builder.run(creep);
        }
    }
}