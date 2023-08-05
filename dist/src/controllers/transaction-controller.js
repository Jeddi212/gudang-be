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
const inventory_dto_1 = require("../dto/inventory-dto");
const transaction_dto_1 = require("../dto/transaction-dto");
const validation_1 = __importDefault(require("../utils/validation"));
const transaction_service_1 = __importDefault(require("../services/transaction-service"));
const transaction_service_2 = __importDefault(require("../services/transaction-service"));
const createTransaction = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        yield validation_1.default.validateCreateTransaction(req);
        const inventory = (_a = req.body.inventory) !== null && _a !== void 0 ? _a : [];
        const dto = new transaction_dto_1.TransactionDTO(req.body.event, (_b = req.payload) === null || _b === void 0 ? void 0 : _b.name, inventory.map((i) => new inventory_dto_1.InventoryDTO(parseInt(i.quantity), i.product, i.warehouse)));
        const result = yield transaction_service_1.default.createTransaction(dto);
        const payload = new payload_1.Payload(`Transaction successfully created`, result);
        res.status(200).json(payload);
    }
    catch (e) {
        next(e);
    }
});
const findTransactions = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const event = req.query.event || '';
        const username = req.query.username || '';
        let transactions = yield transaction_service_2.default.findTransactions(event, username);
        const payload = new payload_1.Payload(`Transactions successfully fetched`, transactions);
        res.status(200).json(payload);
    }
    catch (e) {
        next(e);
    }
});
const findTransactionById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield validation_1.default.validateTransactionId(req);
        const id = parseInt(req.params.id);
        const transactions = yield transaction_service_1.default.findTransactionById(id);
        const payload = new payload_1.Payload(`Transactions ${id} successfully fetched`, transactions);
        res.status(200).json(payload);
    }
    catch (e) {
        next(e);
    }
});
const updateTransaction = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        validation_1.default.validateAdminRole((_c = req.payload) === null || _c === void 0 ? void 0 : _c.level);
        yield validation_1.default.validateTransactionId(req);
        yield validation_1.default.validateUpdateTransaction(req);
        const id = parseInt(req.params.id);
        const dto = new transaction_dto_1.UpdateTransactionDTO(req.body.event, req.body.username);
        const transactions = yield transaction_service_1.default.updateTransaction(id, dto);
        const payload = new payload_1.Payload(`Transactions ${id} successfully updated`, transactions);
        res.status(200).json(payload);
    }
    catch (e) {
        next(e);
    }
});
exports.default = {
    createTransaction,
    findTransactions,
    findTransactionById,
    updateTransaction,
};
