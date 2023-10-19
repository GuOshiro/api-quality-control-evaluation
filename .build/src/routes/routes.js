"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const LogRoutes_1 = __importDefault(require("./LogRoutes"));
function default_1(app) {
    app
        .route("/")
        .get((req, res) => res.status(200).send("Test API"));
    app.use(express_1.default.json(), LogRoutes_1.default);
}
exports.default = default_1;
