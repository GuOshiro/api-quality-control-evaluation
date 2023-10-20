import { RandomGenericService } from "../Generic/RandomService";

export class HumidityRandomService extends RandomGenericService {
  constructor() {
    super();
  }

  generateRandomHumidityList(count: number): string {
    const randomNumber = this.generateRandomNumber();
    const generateRandomHumidity = this.generateRandomHumidity(randomNumber);
    const listToString = this.convertListToStringAndAddDate(
      generateRandomHumidity
    );
    return `humidity hum-${count}\n${listToString}`;
  }

  generateRandomHumidity(count: number) {
    const randomHumidity = [];
    for (let i = 0; i < count; i++) {
      const humidity = (Math.random() * 100).toFixed(1);
      randomHumidity.push(parseFloat(humidity));
    }
    return randomHumidity;
  }
}
