"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Log {
    constructor(data) {
        const { createdAt, value } = this.generateLog(data);
        this._createdAt = createdAt;
        this._value = value;
    }
    get createdAt() {
        return this._createdAt;
    }
    get value() {
        return this._value;
    }
    generateLog(data) {
        try {
            const dataList = data.split(" ");
            return {
                createdAt: dataList[0],
                value: Number(dataList[1]),
            };
        }
        catch (e) {
            throw new Error("Log data could not be parsed. Please check your configuration and try again!");
        }
    }
}
exports.default = Log;
