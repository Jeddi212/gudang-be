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
const warehouse_dto_1 = require("../dto/warehouse-dto");
const validation_1 = __importDefault(require("../utils/validation"));
const warehouse_service_1 = __importDefault(require("../services/warehouse-service"));
const response_error_1 = require("../dto/response-error");
const createWarehouse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        validation_1.default.validateAdminRole((_a = req.payload) === null || _a === void 0 ? void 0 : _a.level);
        yield validation_1.default.validateWarehouse(req);
        const dto = new warehouse_dto_1.WarehouseDTO(req.body.location);
        const warehouse = yield warehouse_service_1.default.createWarehouse(dto);
        const payload = new payload_1.Payload(`Warehouse ${dto.location} created`, warehouse);
        res.status(200).json(payload);
    }
    catch (e) {
        next(e);
    }
});
const readWarehouses = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const warehouse = yield warehouse_service_1.default.readWarehouses();
        const payload = new payload_1.Payload(`Read all warehouse success`, warehouse);
        res.status(200).json(payload);
    }
    catch (e) {
        next(e);
    }
});
const readWarehouseByLocation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield validation_1.default.validateWarehouseLocationParam(req);
        const location = req.params.location;
        const warehouse = yield warehouse_service_1.default.findWarehouseByLocation(location);
        const payload = new payload_1.Payload(`Warehouse ${location} successfully fetched`, warehouse);
        res.status(200).json(payload);
    }
    catch (e) {
        next(e);
    }
});
const updateWarehouse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        validation_1.default.validateAdminRole((_b = req.payload) === null || _b === void 0 ? void 0 : _b.level);
        yield validation_1.default.validateUpdateWarehouse(req);
        const original = req.params.location;
        const dto = new warehouse_dto_1.WarehouseDTO(req.body.location);
        const warehouse = yield warehouse_service_1.default.updateWarehouse(original, dto);
        const payload = new payload_1.Payload(`Warehouse ${original} successfully updated`, warehouse);
        res.status(200).json(payload);
    }
    catch (e) {
        next(e);
    }
});
const deleteWarehouse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        validation_1.default.validateAdminRole((_c = req.payload) === null || _c === void 0 ? void 0 : _c.level);
        yield validation_1.default.validateDeleteWarehouse(req);
        const validateKey = req.header('HX-Prompt') || '';
        const location = req.params.location;
        if (validateKey !== location) {
            throw new response_error_1.ResponseError(422, 'The provided prompt does not match the ID to be deleted');
        }
        const warehouse = yield warehouse_service_1.default.deleteWarehouse(location);
        const payload = new payload_1.Payload(`Warehouse ${location} successfully deleted`, warehouse);
        res.status(200).json(payload);
    }
    catch (e) {
        next(e);
    }
});
exports.default = {
    createWarehouse,
    readWarehouses,
    readWarehouseByLocation,
    updateWarehouse,
    deleteWarehouse,
};
