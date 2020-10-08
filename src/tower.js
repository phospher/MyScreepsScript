export default {
    process(roomName) {
        const towers = Game.rooms[roomName].find(FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_TOWER } });
        if (towers && towers.length > 0) {
            towers.forEach(tower => {
                const closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                if (closestHostile) {
                    tower.attack(closestHostile);
                    return;
                }

                const closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => structure.hits < structure.hitsMax
                });
                if (closestDamagedStructure) {
                    tower.repair(closestDamagedStructure);
                }
            });
        }
    }
}