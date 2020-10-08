import { getSource } from "./utils";
import RoleRunner from "./roleRunner";
import { attack } from "./role.common";

function initMemory(creep) {
    if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
        creep.memory.upgrading = false;
        creep.say('harvest');
    }
    if (!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
        creep.memory.upgrading = true;
        creep.say('upgrade');
    }
}

function upgradeController(creep) {
    if (creep.memory.upgrading) {
        if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' } });
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
    return false;
}

export default {
    run(creep) {
        const roleRunner = new RoleRunner();
        const commandList = [attack, upgradeController, harvest];
        roleRunner.commandList.push(...commandList);
        roleRunner.initMemory = initMemory;
        roleRunner.run(creep);
    },

    create(body, role, targets, spawn) {
        return spawn.spawnCreep(body, role + Game.time, { memory: { role: role, tag: Math.round(Game.time / 100) } });
    }
}