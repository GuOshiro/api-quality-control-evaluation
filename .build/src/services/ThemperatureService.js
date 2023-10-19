"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Themperature = void 0;
const ControlEvaluationService_1 = require("./ControlEvaluationService");
class Themperature extends ControlEvaluationService_1.ControlEvaluation {
    constructor(name, logs, reference) {
        super(name, logs);
        this._maxAvgDifference = 0.5;
        this._minDeviation = 3;
        this._maxDeviation = 5;
        this._precision = this.precisionRule(reference, logs);
    }
    precisionRule(reference, logs) {
        const difference = Math.abs(this.avarage - reference.temperature);
        const squaredDifferences = logs.map((data) => Math.pow(data.value - this.avarage, 2));
        const meanSquaredDifferences = squaredDifferences.reduce((acc, curr) => acc + curr, 0) / logs.length;
        const standardDeviation = Math.sqrt(meanSquaredDifferences);
        if (difference < this._maxAvgDifference &&
            standardDeviation < this._minDeviation) {
            return "ultra precise";
        }
        else if (difference < this._maxAvgDifference &&
            standardDeviation < this._maxDeviation) {
            return "very precise";
        }
        else {
            return "precise";
        }
    }
    get precision() {
        return this._precision;
    }
}
exports.Themperature = Themperature;
