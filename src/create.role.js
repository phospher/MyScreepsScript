import data from "./data";


export default {
    create(role, count, spawnName, body) {
        const spawn = Game.spawns[spawnName];
        const targets = _.filter(Game.creeps, value => value.memory.role === role);
        if (!targets || targets.length < count) {
            const roleModule = data.ROLE_MODULES[role];
            if (roleModule) {
                const result = roleModule.create(body, role, targets, spawn);
                if (result == 0) {
                    console.log("create " + role + " success");
                } else if (result != ERR_NOT_ENOUGH_ENERGY && result != ERR_BUSY) {
                    console.log("create " + role + "fail: " + result);
                }
                return result;
            }
        }
        return -1;
    },

    createBatch(creeps) {
        if (creeps) {
            let i = 0;
            for (i = 0; i < creeps.length; i++) {
                const item = creeps[i];
                const result = this.create(item.role, item.count, item.spawnName, item.body);
                if (result == 0) {
                    break;
                }
            }
        }
    }
}