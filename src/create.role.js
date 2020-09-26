export default {
    create(role, count, spawnName, body) {
        const spawn = Game.spawns[spawnName];
        if (spawn.energy >= spawn.energyCapacity) {
            const targets = _.filter(Game.creeps, value => value.memory.role === role);
            if (!targets || targets.length < count) {
                const result = spawn.spawnCreep(body, role + Game.time, { memory: { role: role } });
                if (result == 0) {
                    console.log("create " + role + " success");
                } else {
                    console.log("create " + role + "fail: " + result);
                }
                return result;
            }
        }
        return -1;
    },

    createBatch(creeps) {
        if (creeps) {
            for (let i = 0; i < creeps.length; i++) {
                const item = creeps[i];
                const result = this.create(item.role, item.count, item.spawnName, item.body);
                if (result == 0) {
                    break;
                }
            }
        }
    }
}