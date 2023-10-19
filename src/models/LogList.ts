import { Log } from "./Log";
import { PropertiesKey } from "./Properties";

export type LogList = {
  [key in PropertiesKey]: { [key: string]: Array<Log> };
};
