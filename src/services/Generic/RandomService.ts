export class RandomGenericService {
  constructor() {}

  convertListToStringAndAddDate(list: Array<number>): string {
    const dateList = this.generateRandomDateList(list.length);
    const updatedListWithDate: Array<string> = list.map(
      (item: number, index: number) => `${dateList[index]} ${item}\n`
    );
    const updatedListWithDateToString = updatedListWithDate.join("");
    return updatedListWithDateToString;
  }

  generateRandomDateList(count: number) {
    const dateList = [];
    const randomStartDate = new Date();
    for (let i = 0; i < count; i++) {
      const newDate = new Date(randomStartDate);
      newDate.setMinutes(randomStartDate.getMinutes() + i);
      dateList.push(newDate.toISOString().slice(0, 16));
    }
    return dateList;
  }
  generateRandomNumber(min?: number, max?: number) {
    const _min: number = min || 1;
    const _max: number = max || 20;
    return Math.floor(Math.random() * (_max - _min + 1)) + _min;
  }
}
