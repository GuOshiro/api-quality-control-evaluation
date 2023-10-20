import { RandomGenericService } from "../Generic/RandomService";

export class MonoxideRandomService extends RandomGenericService {
  constructor() {
    super();
  }
  generateRandomMonoxideList(count: number): string {
    const randomNumber = this.generateRandomNumber();
    const generateRandomCarbonMonoxidePPM =
      this.generateRandomCarbonMonoxidePPM(randomNumber);
    const listToString = this.convertListToStringAndAddDate(
      generateRandomCarbonMonoxidePPM
    );
    return `monoxide mon-${count}\n${listToString}`;
  }

  generateRandomCarbonMonoxidePPM(count: number) {
    const randomCarbonMonoxidePPM = [];
    for (let i = 0; i < count; i++) {
      const coValue = Math.floor(Math.random() * 10) + 1;
      randomCarbonMonoxidePPM.push(coValue);
    }
    return randomCarbonMonoxidePPM;
  }
}
