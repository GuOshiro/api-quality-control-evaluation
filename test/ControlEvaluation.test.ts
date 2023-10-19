import { ControlEvaluation } from "../src/services/ControlEvaluationService";
import { Log } from "../src/models/Log";

describe("ControlEvaluation", () => {
  const logs: Log[] = [
    { createdAt: "", value: 10 },
    { createdAt: "", value: 20 },
    { createdAt: "", value: 30 },
  ];
  it("should create an instance with the correct name and average", () => {
    const controlEvaluation = new ControlEvaluation("TestControl", logs);

    expect(controlEvaluation.name).toBe("TestControl");
    expect(controlEvaluation.avarage).toBe(20);
  });

  it("should calculate the precision correctly", () => {
    const controlEvaluation = new ControlEvaluation("TestControl", logs);
    const precision = controlEvaluation.calculatePrecision(logs);

    expect(precision).toBe(20);
  });

  it("should calculate the sum of values correctly", () => {
    const controlEvaluation = new ControlEvaluation("TestControl", logs);
    const sum = controlEvaluation.getSum(logs);

    expect(sum).toBe(60);
  });
});
