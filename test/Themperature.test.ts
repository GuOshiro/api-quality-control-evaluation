import { Themperature } from "../src/services/Themperature/ThemperatureService";
import { Log } from "../src/models/Log";
import { Reference } from "../src/models/Reference";

describe("Themperature", () => {
  it("should create an instance with the correct name, average, and precision", () => {
    const logs: Log[] = [
      { createdAt: "", value: 10 },
      { createdAt: "", value: 20 },
      { createdAt: "", value: 30 },
    ];
    const reference: Reference = {
      CO: 0,
      humidity: 0,
      temperature: 25,
    };
    const themperature = new Themperature("TestThemperature", logs, reference);
    expect(themperature.name).toBe("TestThemperature");
    expect(themperature.avarage).toBe(20);
    expect(themperature.precision).toBe("precise");
  });

  it("should calculate the precision correctly based on the criteria", () => {
    const logs: Log[] = [
      { createdAt: "", value: 72.4 },
      { createdAt: "", value: 76.0 },
      { createdAt: "", value: 79.1 },
    ];
    const reference: Reference = {
      CO: 0,
      humidity: 0,
      temperature: 75.5,
    };
    const themperature = new Themperature("TestThemperature", logs, reference);
    const precision = themperature.precisionRule(reference, logs);
    expect(precision).toBe("ultra precise");
  });
});
