import { Log } from "./Log";
import { PropertiesKey } from "./Properties";

export type LogList = {
  [key in PropertiesKey]: Array<{ [key: string]: Array<Log> }>;
};
