import { Reference } from "../models/Reference";
import { ThemperaturePrecision } from "../models/Themperature";
import { ControlEvaluation } from "./ControlEvaluation";
import { Log } from "../models/Log";

export class Themperature extends ControlEvaluation {
  private _precision: ThemperaturePrecision;
  constructor(name: string, logs: Array<Log>, reference: Reference) {
    super(name, logs);
    this._precision = this.precisionRule(reference, logs);
  }

  private precisionRule(
    reference: Reference,
    logs: Array<Log>
  ): ThemperaturePrecision {
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
