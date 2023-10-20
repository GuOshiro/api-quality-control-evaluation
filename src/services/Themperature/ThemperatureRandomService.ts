import { RandomGenericService } from "../Generic/RandomService";

export class ThemperatureRandomService extends RandomGenericService {
  constructor() {
    super();
  }

  generateRandomTemperaturesList(count: number): string {
    const randomNumber = this.generateRandomNumber();
    const generateRandomTemperatures =
      this.generateRandomTemperatures(randomNumber);
    const listToString = this.convertListToStringAndAddDate(
      generateRandomTemperatures
    );
    return `thermometer temp-${count}\n${listToString}`;
  }

  generateRandomTemperatures(count: number) {
    const randomTemperatures = [];
    for (let i = 0; i < count; i++) {
      const temperature = (Math.random() * 120 - 20).toFixed(1);
      randomTemperatures.push(parseFloat(temperature));
    }
    return randomTemperatures;
  }
}
