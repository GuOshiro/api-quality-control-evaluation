import { Log } from "../models/Log";

export class ControlEvaluation {
  private _name: string;
  private _avarage: number;

  constructor(name: string, logs: Array<Log>) {
    this._name = name;
    this._avarage = this.calculatePrecision(logs);
  }

  calculatePrecision(logs: Array<Log>) {
    return this.getSum(logs) / logs.length;
  }

  private getSum(logs: Array<Log>) {
    return logs.reduce((acc, curr) => acc + curr.value, 0);
  }

  get name(): string {
    return this._name;
  }

  get avarage(): number {
    return this._avarage;
  }
}
