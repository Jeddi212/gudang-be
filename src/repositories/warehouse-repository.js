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
const database_1 = require("../utils/database");
const createNewWarehouse = (wh) => __awaiter(void 0, void 0, void 0, function* () {
    return database_1.prisma.warehouse.create({ data: wh });
});
const readWarehouses = () => __awaiter(void 0, void 0, void 0, function* () {
    return database_1.prisma.warehouse.findMany({
        orderBy: { location: 'asc' }
    });
});
const findWarehouseByLocation = (location) => __awaiter(void 0, void 0, void 0, function* () {
    return database_1.prisma.warehouse.findUnique({
        where: { location: location }
    });
});
const readWarehouseDetail = (location) => __awaiter(void 0, void 0, void 0, function* () {
    return database_1.prisma.warehouse.findUnique({
        where: { location: location },
        include: {
            Inventory: {
                orderBy: { updatedAt: 'desc' },
            },
            History: {
                orderBy: { updatedAt: 'desc' },
                take: 50
            },
        }
    });
});
const updateWarehouse = (original, wh) => __awaiter(void 0, void 0, void 0, function* () {
    return database_1.prisma.warehouse.update({
        where: { location: original },
        data: { location: wh.location }
    });
});
const deleteWarehouseByLocation = (location) => __awaiter(void 0, void 0, void 0, function* () {
    return database_1.prisma.warehouse.delete({
        where: { location: location }
    });
});
exports.default = {
    createNewWarehouse,
    readWarehouses,
    findWarehouseByLocation,
    readWarehouseDetail,
    updateWarehouse,
    deleteWarehouseByLocation,
};
