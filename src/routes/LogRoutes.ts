import express from "express";
import LogController from "../controllers/LogController";
const routes = express.Router();

routes.post("/log", LogController.verifyLog);

export default routes;
