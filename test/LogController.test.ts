import express from "express";
import LogController from "../src/controllers/LogController";
import { mockData } from "./mockData";

describe("LogController", () => {
  it("should return a response with logsReport when the request body is provided", async () => {
    const req: express.Request = {
      body: mockData,
    } as express.Request;

    const res: express.Response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as express.Response;

    await LogController.verifyLog(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      "hum-1": "keep",
      "hum-2": "discard",
      "mon-1": "keep",
      "mon-2": "discard",
      "temp-1": "precise",
      "temp-2": "ultra precise",
    });
  });

  it("should return a 500 response when the request body is empty", async () => {
    const req: express.Request = {
      body: null,
    } as express.Request;

    const res: express.Response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as express.Response;

    try {
      await LogController.verifyLog(req, res);
    } catch (err) {
      const error = err as Error;
      expect(error.message).toBe("Body cannot be empty. Please, try again");
    }
  });
});
