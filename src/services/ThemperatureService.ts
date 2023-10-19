import { Reference } from "../models/Reference";
import { ThemperaturePrecision } from "../models/Themperature";
import { ControlEvaluation } from "./ControlEvaluationService";
import { Log } from "../models/Log";

export class Themperature extends ControlEvaluation {
  private _precision: ThemperaturePrecision;
  private _maxAvgDifference: number = 0.5;
  private _minDeviation: number = 3;
  private _maxDeviation: number = 5;
  constructor(name: string, logs: Array<Log>, reference: Reference) {
    super(name, logs);
    this._precision = this.precisionRule(reference, logs);
  }

  precisionRule(reference: Reference, logs: Array<Log>): ThemperaturePrecision {
    const difference = Math.abs(this.avarage - reference.temperature);
    const squaredDifferences = logs.map((data) =>
      Math.pow(data.value - this.avarage, 2)
    );
    const meanSquaredDifferences =
      squaredDifferences.reduce((acc, curr) => acc + curr, 0) / logs.length;
    const standardDeviation = Math.sqrt(meanSquaredDifferences);

    if (
      difference < this._maxAvgDifference &&
      standardDeviation < this._minDeviation
    ) {
      return "ultra precise";
    } else if (
      difference < this._maxAvgDifference &&
      standardDeviation < this._maxDeviation
    ) {
      return "very precise";
    } else {
      return "precise";
    }
  }

  get precision(): string {
    return this._precision;
  }
}
