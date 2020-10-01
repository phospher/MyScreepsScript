import { getSource } from "./utils";

const STRUCTURE_TYPE_PRIORITY = [STRUCTURE_TOWER, STRUCTURE_SPAWN, STRUCTURE_EXTENSION];

export default {
    run(creep) {
        if (creep.store.getFreeCapacity() > 0) {
            const source = getSource(creep, 1);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
        else {
            if (creep.memory.main) {
                const mainTargets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => structure.structureType == STRUCTURE_TYPE_PRIORITY[creep.memory.main] && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                });
                if (mainTargets.length > 0) {
                    if (creep.transfer(mainTargets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(mainTargets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                    }
                    return;
                }
            }
            for (let i = 0; i < STRUCTURE_TYPE_PRIORITY.length; i++) {
                const targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return structure.structureType == STRUCTURE_TYPE_PRIORITY[i] &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                });
                if (targets.length > 0) {
                    if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                    }
                    break;
                }
            }
        }
    },

    create(body, role, targets, spawn) {
        const harvesters = _.filter(Game.creeps, i => i.memory.role == "harvester");
        const main = harvesters.length % STRUCTURE_TYPE_PRIORITY.length;
        return spawn.spawnCreep(body, role + Game.time, { memory: { role: role, tag: targets.length, main: main } });
    }
}