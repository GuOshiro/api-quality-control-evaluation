"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const LogController_1 = __importDefault(require("../controllers/LogController"));
const routes = express_1.default.Router();
routes.post("/log", LogController_1.default.verifyLog);
exports.default = routes;
