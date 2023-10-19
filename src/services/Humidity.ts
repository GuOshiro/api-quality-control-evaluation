import { Reference } from "../models/Reference";
import { ControlEvaluation } from "./ControlEvaluation";
import Log from "./LogService";

export class Humidity extends ControlEvaluation {
  private _precision: "discard" | "keep";
  constructor(name: string, logs: Array<Log>, reference: Reference) {
    super(name, logs);
    this._precision = this.precisionRule(reference);
  }

  private precisionRule(reference: Reference): "discard" | "keep" {
    const difference = this.avarage / reference.humidity;
    if (difference < 1) {
      return "discard";
    } else {
      return "keep";
    }
  }

  get precision(): string {
    return this._precision;
  }
}
