import { LogList } from "../models/LogList";
import { PropertiesKey } from "../models/Properties";
import { Reference } from "../models/Reference";
import { Humidity } from "./Humidity";
import Log from "./LogService";
import { Monoxide } from "./Monoxide";
import { ReferenceService } from "./ReferenceService";
import { Themperature } from "./Themperature";

class LogListService {
  private _logs: LogList;

  private _logsReport: { [key: string]: string };

  constructor(data: string) {
    const logs = this.generateLogList(data);
    this._logs = logs;
    this._logsReport = this.generateLogsReport(data);
  }

  get logsReport(): { [key: string]: string } {
    return this._logsReport;
  }

  generateLogList(data: string): LogList {
    try {
      const mappedObj: LogList = {
        reference: [],
        thermometer: [],
        humidity: [],
        monoxide: [],
      };
      let currentProperty: PropertiesKey = "reference";
      let propertyCustomName: string;
      const properties = ["reference", "thermometer", "humidity", "monoxide"];
      const lines = data.split("\n");
      lines
        .filter((line: string) => line)
        .forEach((line: string) => {
          const splittedLine = line.split(" ");
          const propertyName = splittedLine[0] as PropertiesKey;
          const content = splittedLine[1] as string;
          if (propertyName === "reference") {
            mappedObj[currentProperty]["reference"] = [line];
            return;
          }
          if (
            properties.includes(propertyName) &&
            propertyCustomName !== content
          ) {
            currentProperty = propertyName as PropertiesKey;
            propertyCustomName = content;
            mappedObj[propertyName] = {
              ...mappedObj[propertyName],
              [`${splittedLine[1]}`]: [],
            };
            return;
          }
          mappedObj[currentProperty][propertyCustomName].push(new Log(line));
        });

      return mappedObj;
    } catch (err) {
      throw new Error(
        "Something went wrong on method generateLogList of LogListService"
      );
    }
  }

  generateLogsReport(data: string): { [key: string]: string } {
    try {
      let report: { [key: string]: string } = {};
      const reference = new ReferenceService(data);
      for (const key in this._logs) {
        const controlEvaluation = this.generateControlEvaluation(
          key as PropertiesKey,
          reference
        );
        if (controlEvaluation) {
          report = { ...report, ...controlEvaluation };
        }
      }
      return report;
    } catch (err) {
      throw new Error(
        "Something went wrong on method generateLogsReport of LogListService"
      );
    }
  }

  generateControlEvaluation(
    key: PropertiesKey,
    reference: Reference
  ): { [key: string]: string } | undefined {
    try {
      if (key === "reference") {
        return;
      }
      let report: { [key: string]: string } = {};
      for (const customName in this._logs[key]) {
        let reportBycontrolEvaluationReport: { [key: string]: string } = {};
        if (key === "thermometer") {
          const themperature = new Themperature(
            customName,
            this._logs[key][customName],
            reference
          );
          reportBycontrolEvaluationReport = {
            [customName]: themperature.precision,
          };
        }
        if (key === "humidity") {
          const humidity = new Humidity(
            customName,
            this._logs[key][customName],
            reference
          );
          reportBycontrolEvaluationReport = {
            [customName]: humidity.precision,
          };
        }
        if (key === "monoxide") {
          const monoxide = new Monoxide(
            customName,
            this._logs[key][customName],
            reference
          );
          reportBycontrolEvaluationReport = {
            [customName]: monoxide.precision,
          };
        }
        report = {
          ...report,
          ...reportBycontrolEvaluationReport,
        };
      }
      return report;
    } catch (err) {
      throw new Error(
        "Something went wrong on method generateControlEvaluation of LogListService"
      );
    }
  }
}

export default LogListService;
