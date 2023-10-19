import express from "express";
import LogListService from "../services/LogListService";
class LogController {
  static async verifyLog(req: express.Request, res: express.Response) {
    if (!req.body) {
      throw new Error("Body cannot be empty. Please, try again");
    }
    try {
      const logServices = new LogListService(req.body);
      res.status(200).json(logServices.logsReport);
    } catch (err) {
      throw new Error("Something went wrong. Please, try again");
    }
  }
}

export default LogController;
