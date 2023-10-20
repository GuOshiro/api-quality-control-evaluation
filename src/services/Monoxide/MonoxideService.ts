import { Reference } from "../../models/Reference";
import { ControlEvaluation } from "../Generic/ControlEvaluationService";
import { Log } from "../../models/Log";

export class Monoxide extends ControlEvaluation {
  private _precision: "discard" | "keep";
  private _limit: number = 3;
  constructor(name: string, logs: Array<Log>, reference: Reference) {
    super(name, logs);
    this._precision = this.precisionRule(reference, logs);
  }

  private precisionRule(
    reference: Reference,
    logs: Array<Log>
  ): "discard" | "keep" {
    for (const reading of logs) {
      const deviation = Math.abs(reading.value - reference.CO);
      if (deviation > this._limit) {
        return "discard";
      }
    }
    return "keep";
  }

  get precision(): string {
    return this._precision;
  }
}
