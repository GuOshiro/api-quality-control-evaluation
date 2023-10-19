"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = __importDefault(require("./routes/routes"));
const serverless_http_1 = __importDefault(require("serverless-http"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.text({ type: "*/*" }));
app.use(express_1.default.json());
(0, routes_1.default)(app);
exports.handler = (0, serverless_http_1.default)(app);
exports.default = (0, serverless_http_1.default)(app);
