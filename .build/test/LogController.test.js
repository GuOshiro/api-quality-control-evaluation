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
const LogController_1 = __importDefault(require("../src/controllers/LogController"));
const mockData_1 = require("./mockData");
describe("LogController", () => {
    it("should return a response with logsReport when the request body is provided", () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            body: mockData_1.mockData,
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        yield LogController_1.default.verifyLog(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            "hum-1": "keep",
            "hum-2": "discard",
            "mon-1": "keep",
            "mon-2": "discard",
            "temp-1": "precise",
            "temp-2": "ultra precise",
        });
    }));
    it("should return a 500 response when the request body is empty", () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            body: null,
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        try {
            yield LogController_1.default.verifyLog(req, res);
        }
        catch (err) {
            const error = err;
            expect(error.message).toBe("Body cannot be empty. Please, try again");
        }
    }));
});
