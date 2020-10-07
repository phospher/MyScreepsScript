export default class RoleRunner {

    constructor() {
        this.initMemory = null;
        this.commandList = [];
    }

    run(creep) {
        if (this.initMemory && _.isFunction(this.initMemory)) {
            this.initMemory(creep);
        }

        if (this.commandList && _.isArray(this.commandList)) {
            for (let i = 0; i < this.commandList.length; i++) {
                if (_.isFunction(this.commandList[i])) {
                    const result = this.commandList[i](creep);
                    if (result === false) {
                        break;
                    }
                }
            }
        }
    }
}