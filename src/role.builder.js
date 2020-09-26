export default {
    run(creep) {
        if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('harvest');
        }
        if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
            creep.say('build');
        }

        if (creep.memory.building) {
            const repairTargets = creep.room.find(FIND_STRUCTURES, {
                filter: (item) => {
                    return item.hits < item.hitsMax / 3;
                }
            });
            if (creep.repair(repairTargets[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(repairTargets[0], { visualizePathStyle: { stroke: '#ffffff' } });
            }

            const targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if (targets.length) {
                if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
        }
        else {
            const sources = creep.room.find(FIND_SOURCES);
            const sourceIndex = (creep.memory.tag ?? 0) % 2;
            if (creep.harvest(sources[sourceIndex]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[sourceIndex], { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
    }
}