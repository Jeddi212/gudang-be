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
const readAllInventories = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield database_1.prisma.inventory.findMany({
        orderBy: [{ productId: 'asc' }, { warehouseId: 'asc' }]
    });
});
const updateInventoryStock = (tx, products) => __awaiter(void 0, void 0, void 0, function* () {
    const upsertedRecords = [];
    try {
        for (const p of products) {
            const currentStock = yield tx.inventory.findUnique({
                where: { productId_warehouseId: { productId: p.product, warehouseId: p.warehouse } },
                select: { quantity: true },
            });
            const newQuantity = ((currentStock === null || currentStock === void 0 ? void 0 : currentStock.quantity) || 0) + p.quantity;
            if (newQuantity < 0) {
                throw new response_error_1.ResponseError(400, 'Quantity cannot make stock negative.', {
                    "product": p.product,
                    "warehouse": p.warehouse,
                    "stock": currentStock === null || currentStock === void 0 ? void 0 : currentStock.quantity,
                    "quantity": p.quantity,
                    "newStock": newQuantity,
                });
            }
            const upsertedRecord = yield tx.inventory.upsert({
                where: { productId_warehouseId: { productId: p.product, warehouseId: p.warehouse } },
                create: { productId: p.product, warehouseId: p.warehouse, quantity: newQuantity },
                update: { quantity: newQuantity },
            });
            upsertedRecords.push(upsertedRecord);
        }
        return upsertedRecords;
    }
    catch (error) {
        yield tx.$queryRaw `ROLLBACK;`;
        throw new response_error_1.ResponseError(500, 'Error during transaction update inventory stock', error);
    }
});
function getInvetoryOfProducts(productNames) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.prisma.inventory.findMany({
            select: { productId: true, warehouseId: true, quantity: true },
            where: { productId: { in: productNames } },
            orderBy: [{ productId: 'asc' }, { warehouseId: 'asc' }]
        });
    });
}
exports.default = {
    readAllInventories,
    updateInventoryStock,
    getInvetoryOfProducts,
};
