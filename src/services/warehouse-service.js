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
const response_error_1 = require("../dto/response-error");
const warehouse_1 = require("../models/warehouse");
const warehouse_repository_1 = __importDefault(require("../repositories/warehouse-repository"));
const createWarehouse = (dto) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield warehouse_repository_1.default.findWarehouseByLocation(dto.location)) {
        throw new response_error_1.ResponseError(409, `Warehouse ${dto.location} already exist`, dto);
    }
    const warehouse = yield warehouse_repository_1.default.createNewWarehouse(dto.mapToModel());
    return new warehouse_1.Warehouse(warehouse.location);
});
const readWarehouses = () => __awaiter(void 0, void 0, void 0, function* () {
    const warehouse = yield warehouse_repository_1.default.readWarehouses();
    return warehouse.map(w => new warehouse_1.Warehouse(w.location));
});
const findWarehouseByLocation = (location) => __awaiter(void 0, void 0, void 0, function* () {
    const warehouse = yield warehouse_repository_1.default.readWarehouseDetail(location);
    if (!warehouse) {
        throw new response_error_1.ResponseError(404, `Warehouse ${location} not found`, warehouse);
    }
    return warehouse;
});
const updateWarehouse = (original, dto) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield warehouse_repository_1.default.findWarehouseByLocation(original))) {
        throw new response_error_1.ResponseError(409, `Warehouse ${original} is not exist`, {
            "current": original,
            "updated": dto
        });
    }
    if (yield warehouse_repository_1.default.findWarehouseByLocation(dto.location)) {
        throw new response_error_1.ResponseError(409, `Warehouse ${dto.location} already exist`, {
            "current": original,
            "updated": dto
        });
    }
    const warehouse = yield warehouse_repository_1.default.updateWarehouse(original, dto.mapToModel());
    return new warehouse_1.Warehouse(warehouse.location);
});
const deleteWarehouse = (location) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield warehouse_repository_1.default.findWarehouseByLocation(location))) {
        throw new response_error_1.ResponseError(409, `Warehouse ${location} is not exist`);
    }
    const warehouse = yield warehouse_repository_1.default.deleteWarehouseByLocation(location);
    return new warehouse_1.Warehouse(warehouse.location);
});
exports.default = {
    createWarehouse,
    readWarehouses,
    findWarehouseByLocation,
    updateWarehouse,
    deleteWarehouse,
};
