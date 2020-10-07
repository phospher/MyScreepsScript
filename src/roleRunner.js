export default class RoleRunner {

    constructor() {
        this.memoryInit = null;
        this.commandList = [];
    }

    run(creep) {
        if (this.memoryInit && _.isFunction(this.memoryInit)) {
            this.memoryInit(creep);
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