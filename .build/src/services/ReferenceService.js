"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReferenceService = void 0;
class ReferenceService {
    constructor(data) {
        const { temperature, humidity, CO } = this.generateReference(data);
        this._temperature = temperature;
        this._humidity = humidity;
        this._CO = CO;
    }
    get temperature() {
        return this._temperature;
    }
    get humidity() {
        return this._humidity;
    }
    get CO() {
        return this._CO;
    }
    generateReference(data) {
        try {
            const lines = data.trim().split("\n");
            const referenceLine = lines[0].split(" ").slice(1).map(parseFloat);
            return {
                temperature: referenceLine[0],
                humidity: referenceLine[1],
                CO: referenceLine[2],
            };
        }
        catch (e) {
            throw new Error("Reference data could not be parsed. Please check your configuration and try again!");
        }
    }
}
exports.ReferenceService = ReferenceService;
