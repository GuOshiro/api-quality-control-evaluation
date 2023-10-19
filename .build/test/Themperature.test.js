"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ThemperatureService_1 = require("../src/services/ThemperatureService");
describe("Themperature", () => {
    it("should create an instance with the correct name, average, and precision", () => {
        const logs = [
            { createdAt: "", value: 10 },
            { createdAt: "", value: 20 },
            { createdAt: "", value: 30 },
        ];
        const reference = {
            CO: 0,
            humidity: 0,
            temperature: 25,
        };
        const themperature = new ThemperatureService_1.Themperature("TestThemperature", logs, reference);
        expect(themperature.name).toBe("TestThemperature");
        expect(themperature.avarage).toBe(20);
        expect(themperature.precision).toBe("precise");
    });
    it("should calculate the precision correctly based on the criteria", () => {
        const logs = [
            { createdAt: "", value: 72.4 },
            { createdAt: "", value: 76.0 },
            { createdAt: "", value: 79.1 },
        ];
        const reference = {
            CO: 0,
            humidity: 0,
            temperature: 75.5,
        };
        const themperature = new ThemperatureService_1.Themperature("TestThemperature", logs, reference);
        const precision = themperature.precisionRule(reference, logs);
        expect(precision).toBe("ultra precise");
    });
});
