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
const database_1 = require("../utils/database");
const transaction_repository_1 = __importDefault(require("../repositories/transaction-repository"));
const inventory_repository_1 = __importDefault(require("../repositories/inventory-repository"));
const product_repository_1 = __importDefault(require("../repositories/product-repository"));
const createTransaction = (dto) => __awaiter(void 0, void 0, void 0, function* () {
    return yield database_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const inventories = yield inventory_repository_1.default.updateInventoryStock(tx, dto.inventory);
        yield product_repository_1.default.updateManyProductStock(tx, dto.inventory);
        const transaction = yield transaction_repository_1.default.createTransaction(tx, dto);
        return { transaction, inventories };
    }));
});
const findTransactions = (event, username) => __awaiter(void 0, void 0, void 0, function* () {
    let whereCondition = {};
    if (event && username) {
        whereCondition = { event: event, username: username };
    }
    else {
        if (event) {
            whereCondition = { event: event };
        }
        if (username) {
            whereCondition = { username: username };
        }
    }
    return yield transaction_repository_1.default.findTransactions(whereCondition);
});
const findTransactionById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield transaction_repository_1.default.findTransactionById(id);
});
const updateTransaction = (id, dto) => __awaiter(void 0, void 0, void 0, function* () {
    return yield transaction_repository_1.default.updateTransaction(id, dto);
});
exports.default = {
    createTransaction,
    findTransactions,
    findTransactionById,
    updateTransaction,
};
