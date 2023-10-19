"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HumidityService_1 = require("./HumidityService");
const LogService_1 = __importDefault(require("./LogService"));
const MonoxideService_1 = require("./MonoxideService");
const ReferenceService_1 = require("./ReferenceService");
const ThemperatureService_1 = require("./ThemperatureService");
class LogListService {
    constructor(data) {
        const logs = this.generateLogList(data);
        this._logs = logs;
        this._logsReport = this.generateLogsReport(data);
    }
    get logsReport() {
        return this._logsReport;
    }
    generateLogList(data) {
        try {
            const mappedObj = {
                reference: {},
                thermometer: {},
                humidity: {},
                monoxide: {},
            };
            let currentProperty = "reference";
            let propertyCustomName;
            const properties = ["reference", "thermometer", "humidity", "monoxide"];
            const lines = data.split("\n");
            lines
                .filter((line) => line)
                .forEach((line) => {
                const splittedLine = line.split(" ");
                const propertyName = splittedLine[0];
                const content = splittedLine[1];
                if (properties.includes(propertyName) &&
                    propertyCustomName !== content) {
                    currentProperty = propertyName;
                    propertyCustomName = content;
                    mappedObj[propertyName] = Object.assign(Object.assign({}, mappedObj[propertyName]), { [`${splittedLine[1]}`]: [] });
                    return;
                }
                mappedObj[currentProperty][propertyCustomName].push(new LogService_1.default(line));
            });
            return mappedObj;
        }
        catch (err) {
            throw new Error("Something went wrong on method generateLogList of LogListService");
        }
    }
    generateLogsReport(data) {
        try {
            let report = {};
            const reference = new ReferenceService_1.ReferenceService(data);
            for (const key in this._logs) {
                const controlEvaluation = this.generateControlEvaluation(key, reference);
                if (controlEvaluation) {
                    report = Object.assign(Object.assign({}, report), controlEvaluation);
                }
            }
            return report;
        }
        catch (err) {
            throw new Error("Something went wrong on method generateLogsReport of LogListService");
        }
    }
    generateControlEvaluation(key, reference) {
        try {
            if (key === "reference") {
                return;
            }
            let report = {};
            for (const customName in this._logs[key]) {
                let reportBycontrolEvaluationReport = {};
                if (key === "thermometer") {
                    const themperature = new ThemperatureService_1.Themperature(customName, this._logs[key][customName], reference);
                    reportBycontrolEvaluationReport = {
                        [customName]: themperature.precision,
                    };
                }
                if (key === "humidity") {
                    const humidity = new HumidityService_1.Humidity(customName, this._logs[key][customName], reference);
                    reportBycontrolEvaluationReport = {
                        [customName]: humidity.precision,
                    };
                }
                if (key === "monoxide") {
                    const monoxide = new MonoxideService_1.Monoxide(customName, this._logs[key][customName], reference);
                    reportBycontrolEvaluationReport = {
                        [customName]: monoxide.precision,
                    };
                }
                report = Object.assign(Object.assign({}, report), reportBycontrolEvaluationReport);
            }
            return report;
        }
        catch (err) {
            throw new Error("Something went wrong on method generateControlEvaluation of LogListService");
        }
    }
}
exports.default = LogListService;
