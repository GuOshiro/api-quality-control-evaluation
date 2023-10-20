export class ReferenceService {
  private _temperature: number;
  private _humidity: number;
  private _CO: number;

  constructor(data: string) {
    const { temperature, humidity, CO } = this.generateReference(data);
    this._temperature = temperature;
    this._humidity = humidity;
    this._CO = CO;
  }

  get temperature(): number {
    return this._temperature;
  }
  get humidity(): number {
    return this._humidity;
  }
  get CO(): number {
    return this._CO;
  }

  private generateReference(data: string): {
    temperature: number;
    humidity: number;
    CO: number;
  } {
    try {
      const lines = data.trim().split("\n");
      const referenceLine = lines[0].split(" ").slice(1).map(parseFloat);
      return {
        temperature: referenceLine[0],
        humidity: referenceLine[1],
        CO: referenceLine[2],
      };
    } catch (e) {
      throw new Error(
        "Reference data could not be parsed. Please check your configuration and try again!"
      );
    }
  }
}
