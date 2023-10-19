"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LogListService_1 = __importDefault(require("../services/LogListService"));
class LogController {
    static verifyLog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.body) {
                throw new Error("Body cannot be empty. Please, try again");
            }
            try {
                const logServices = new LogListService_1.default(req.body);
                res.status(200).json(logServices.logsReport);
            }
            catch (err) {
                throw new Error("Something went wrong. Please, try again");
            }
        });
    }
}
exports.default = LogController;
