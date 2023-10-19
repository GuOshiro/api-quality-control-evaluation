import { Reference } from "../models/Reference";
import { ControlEvaluation } from "./ControlEvaluation";
import Log from "./LogService";

export class Themperature extends ControlEvaluation {
  private _precision: "precise" | "ultra precise" | "very precise";
  constructor(name: string, logs: Array<Log>, reference: Reference) {
    super(name, logs);
    this._precision = this.precisionRule(reference, logs);
  }

  private precisionRule(
    reference: Reference,
    logs: Array<Log>
  ): "precise" | "ultra precise" | "very precise" {
    const difference = Math.abs(this.avarage - reference.temperature);
    const squaredDifferences = logs.map((data) =>
      Math.pow(data.value - this.avarage, 2)
    );
    const meanSquaredDifferences =
      squaredDifferences.reduce((acc, curr) => acc + curr, 0) / logs.length;
    const standardDeviation = Math.sqrt(meanSquaredDifferences);

    if (difference < 0.5 && standardDeviation < 3) {
      return "ultra precise";
    } else if (difference < 0.5 && standardDeviation < 5) {
      return "very precise";
    } else {
      return "precise";
    }
  }

  get precision(): string {
    return this._precision;
  }
}
