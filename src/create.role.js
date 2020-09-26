export default {
    create: function (role, count, spawnName, body) {
        const spawn = Game.spawns[spawnName];
        if (spawn.energy >= spawn.energyCapacity) {
            const targets = _.filter(Game.creeps, value => value.memory.role === role);
            if (!targets || targets.length < count) {
                spawn.spawnCreep(body, role + Game.time, { memory: { role: role } });
            }
        }
    }
}