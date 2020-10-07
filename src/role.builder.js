import { getSource } from "./utils";
import RoleRunner from "./roleRunner";

function initMemory(creep) {
    if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
        creep.memory.building = false;
        creep.say('harvest');
    }
    if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
        creep.memory.building = true;
        creep.say('build');
    }
}

function buildStructure(creep) {
    if (creep.memory.building) {
        const targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        if (targets.length) {
            if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
            }
            return false;
        }
        return true;
    } else {
        return true;
    }
}

function repairStructure(creep) {
    if (creep.memory.building) {
        const repairTargets = creep.room.find(FIND_STRUCTURES, {
            filter: (item) => {
                return item.hits < item.hitsMax / 3;
            }
        });
        repairTargets.sort((a, b) => a.hits - b.hits);
        if (creep.repair(repairTargets[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(repairTargets[0], { visualizePathStyle: { stroke: '#ffffff' } });
        }
        return false;
    } else {
        return true;
    }
}

function harvest(creep) {
    const source = getSource(creep, 1);
    if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
        creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
    }
}

export default {
    run(creep) {
        const roleRunner = new RoleRunner();
        const commandList = [buildStructure, repairStructure, harvest];
        roleRunner.commandList.push(...commandList);
        roleRunner.initMemory = initMemory;
        roleRunner.run(creep);
    },

    create(body, role, targets, spawn) {
        return spawn.spawnCreep(body, role + Game.time, { memory: { role: role, tag: Game.time } })
    }
}