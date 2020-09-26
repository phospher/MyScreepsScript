import builder from "./role.builder";
import harvester from "./role.harvester";
import upgrader from "./role.upgrader";
import createRole from "./create.role";
import data from "./data";
import memory from "./memory";


export function loop() {

    createRole.createBatch(data.CREEPS);

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

    memory.clear();
}