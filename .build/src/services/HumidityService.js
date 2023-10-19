"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Humidity = void 0;
const ControlEvaluationService_1 = require("./ControlEvaluationService");
class Humidity extends ControlEvaluationService_1.ControlEvaluation {
    constructor(name, logs, reference) {
        super(name, logs);
        this._precision = this.precisionRule(reference);
    }
    precisionRule(reference) {
        const difference = this.avarage / reference.humidity;
        if (difference < 1) {
            return "discard";
        }
        else {
            return "keep";
        }
    }
    get precision() {
        return this._precision;
    }
}
exports.Humidity = Humidity;
