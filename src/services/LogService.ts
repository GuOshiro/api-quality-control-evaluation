class Log {
  private _createdAt: string;
  private _value: number;

  constructor(data: string) {
    const { createdAt, value } = this.generateLog(data);
    this._createdAt = createdAt;
    this._value = value;
  }

  get createdAt(): string {
    return this._createdAt;
  }

  get value(): number {
    return this._value;
  }

  private generateLog(data: string): {
    createdAt: string;
    value: number;
  } {
    try {
      const dataList = data.split(" ");
      return {
        createdAt: dataList[0],
        value: Number(dataList[1]),
      };
    } catch (e) {
      throw new Error(
        "Log data could not be parsed. Please check your configuration and try again!"
      );
    }
  }
}

export default Log;
