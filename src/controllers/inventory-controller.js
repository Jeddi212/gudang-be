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
const payload_1 = require("../dto/payload");
const inventory_service_1 = __importDefault(require("../services/inventory-service"));
const readAllInventories = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const inventories = yield inventory_service_1.default.readAllInventories();
        const payload = new payload_1.Payload(`Inventories successfully fetched`, inventories);
        res.status(200).json(payload);
    }
    catch (e) {
        next(e);
    }
});
exports.default = {
    readAllInventories,
};
