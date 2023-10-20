import express from "express";
import { RandomService } from "../services/Random/RandomService";

class RandomController {
  constructor() {}

  static async generateRandomLogs(req: express.Request, res: express.Response) {
    try {
      const randomService = new RandomService();
      const generictData = randomService.generateRandomData();
      res.status(200).json(generictData);
    } catch (err) {
      throw new Error("Something went wrong. Please, try again");
    }
  }
}

export default RandomController;
