"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Monoxide = void 0;
const ControlEvaluationService_1 = require("./ControlEvaluationService");
class Monoxide extends ControlEvaluationService_1.ControlEvaluation {
    constructor(name, logs, reference) {
        super(name, logs);
        this._limit = 3;
        this._precision = this.precisionRule(reference, logs);
    }
    precisionRule(reference, logs) {
        for (const reading of logs) {
            const deviation = Math.abs(reading.value - reference.CO);
            if (deviation > this._limit) {
                return "discard";
            }
        }
        return "keep";
    }
    get precision() {
        return this._precision;
    }
}
exports.Monoxide = Monoxide;
