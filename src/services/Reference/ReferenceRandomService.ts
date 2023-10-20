import { HumidityRandomService } from "../Humidty/HumidityRandomService";
import { MonoxideRandomService } from "../Monoxide/MonoxideRandomService";
import { ThemperatureRandomService } from "../Themperature/ThemperatureRandomService";

export class ReferenceRandomService {
  private _themperatureRandomService: ThemperatureRandomService;

  private _humidityRandomService: HumidityRandomService;

  private _monoxideRandomService: MonoxideRandomService;

  constructor() {
    this._themperatureRandomService = new ThemperatureRandomService();
    this._humidityRandomService = new HumidityRandomService();
    this._monoxideRandomService = new MonoxideRandomService();
  }

  generateRandomReference(): string {
    const temperatures =
      this._themperatureRandomService.generateRandomTemperatures(1);
    const humidity = this._humidityRandomService.generateRandomHumidity(1);
    const monoxide =
      this._monoxideRandomService.generateRandomCarbonMonoxidePPM(1);
    return `reference ${temperatures} ${humidity} ${monoxide}\n`;
  }
}
