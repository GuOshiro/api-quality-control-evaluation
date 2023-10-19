"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControlEvaluation = void 0;
class ControlEvaluation {
    constructor(name, logs) {
        this._name = name;
        this._avarage = this.calculatePrecision(logs);
    }
    calculatePrecision(logs) {
        return this.getSum(logs) / logs.length;
    }
    getSum(logs) {
        return logs.reduce((acc, curr) => acc + curr.value, 0);
    }
    get name() {
        return this._name;
    }
    get avarage() {
        return this._avarage;
    }
}
exports.ControlEvaluation = ControlEvaluation;
