import { RandomGenericService } from "../Generic/RandomService";
import { HumidityRandomService } from "../Humidty/HumidityRandomService";
import { MonoxideRandomService } from "../Monoxide/MonoxideRandomService";
import { ReferenceRandomService } from "../Reference/ReferenceRandomService";
import { ThemperatureRandomService } from "../Themperature/ThemperatureRandomService";

export class RandomService {
  private _themperatureRandomService: ThemperatureRandomService;

  private _humidityRandomService: HumidityRandomService;

  private _monoxideRandomService: MonoxideRandomService;

  private _referenceRandomService: ReferenceRandomService;

  private _randomGenericService: RandomGenericService;

  constructor() {
    this._themperatureRandomService = new ThemperatureRandomService();
    this._humidityRandomService = new HumidityRandomService();
    this._monoxideRandomService = new MonoxideRandomService();
    this._referenceRandomService = new ReferenceRandomService();
    this._randomGenericService = new RandomGenericService();
  }

  generateRandomData(): string {
    const reference = this._referenceRandomService.generateRandomReference();
    const temperatures = this.iterateRandom((arg: number) =>
      this._themperatureRandomService.generateRandomTemperaturesList(arg)
    );
    const humidity = this.iterateRandom((arg: number) =>
      this._humidityRandomService.generateRandomHumidityList(arg)
    );
    const monoxide = this.iterateRandom((arg: number) =>
      this._monoxideRandomService.generateRandomMonoxideList(arg)
    );
    return `${reference}${temperatures}${humidity}${monoxide}`;
  }
  iterateRandom(method: (arg: number) => string): string {
    const randomNumbers = this._randomGenericService.generateRandomNumber(1, 3);
    let iterateString = ``;
    for (let index = 0; index < randomNumbers; index++) {
      const curr: string = method(index + 1);
      iterateString += curr;
    }
    return iterateString;
  }
}
