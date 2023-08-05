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
Object.defineProperty(exports, "__esModule", { value: true });
const response_error_1 = require("../dto/response-error");
const database_1 = require("../utils/database");
const createTransaction = (tx, transaction) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield tx.transaction.create({
            data: {
                event: transaction.event,
                username: transaction.username,
                History: {
                    create: transaction.inventory.map((i) => {
                        return {
                            quantity: i.quantity,
                            productId: i.product,
                            warehouseId: i.warehouse,
                        };
                    }),
                },
            },
            include: { History: true },
        });
    }
    catch (error) {
        yield tx.$queryRaw `ROLLBACK;`;
        throw new response_error_1.ResponseError(500, 'Error during transaction create transaction', error);
    }
});
const findTransactions = (whereCondition) => __awaiter(void 0, void 0, void 0, function* () {
    return yield database_1.prisma.transaction.findMany({ where: whereCondition, orderBy: { createdAt: 'desc' } });
});
const findTransactionById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield database_1.prisma.transaction.findUnique({
        where: { id: id },
        include: { History: true },
    });
});
const updateTransaction = (id, transaction) => __awaiter(void 0, void 0, void 0, function* () {
    return yield database_1.prisma.transaction.update({
        where: { id: id },
        data: transaction,
        include: { History: true },
    });
});
exports.default = {
    createTransaction,
    findTransactions,
    findTransactionById,
    updateTransaction,
};
