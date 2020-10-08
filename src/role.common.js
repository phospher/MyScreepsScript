export function attack(creep) {
    const target = creep.room.find(FIND_HOSTILE_CREEPS);
    if (target.length) {
        if (creep.attack(target[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target[0], { visualizePathStyle: { stroke: '#ffffff' } });
        }
    }
}