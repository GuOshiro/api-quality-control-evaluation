import express from "express";
import RandomController from "../controllers/RandomController";
const routes = express.Router();

routes.get("/random", RandomController.generateRandomLogs);

export default routes;
