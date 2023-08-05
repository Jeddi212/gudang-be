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
const product_dto_1 = require("../dto/product-dto");
const product_service_1 = __importDefault(require("../services/product-service"));
const validation_1 = __importDefault(require("../utils/validation"));
const response_error_1 = require("../dto/response-error");
const createProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        validation_1.default.validateAdminRole((_a = req.payload) === null || _a === void 0 ? void 0 : _a.level);
        yield validation_1.default.validateProduct(req);
        const materials = (_b = req.body.materials) !== null && _b !== void 0 ? _b : [];
        const dto = new product_dto_1.CreateProductDTO(req.body.name, req.body.description, materials.map((m) => new product_dto_1.Material(m.name, parseInt(m.quantity))));
        const product = yield product_service_1.default.createProduct(dto);
        const payload = new payload_1.Payload(`Product ${req.body.name} successfully created`, product);
        res.status(200).json(payload);
    }
    catch (e) {
        next(e);
    }
});
const readAllProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield validation_1.default.validateProductNameQuery(req);
        const name = req.query.name || '';
        const product = yield product_service_1.default.readAllProducts(name);
        const payload = new payload_1.Payload(`Products successfully fetched`, product);
        res.status(200).json(payload);
    }
    catch (e) {
        next(e);
    }
});
const readProductDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield validation_1.default.validateProductNameParam(req);
        const name = req.params.name;
        const product = yield product_service_1.default.readProductDetails(name);
        const payload = new payload_1.Payload(`Product ${name} successfully fetched`, product);
        res.status(200).json(payload);
    }
    catch (e) {
        next(e);
    }
});
const updateProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    try {
        validation_1.default.validateAdminRole((_c = req.payload) === null || _c === void 0 ? void 0 : _c.level);
        yield validation_1.default.validateProductNameParam(req);
        const name = req.params.name;
        yield validation_1.default.validateProduct(req);
        const materials = (_d = req.body.materials) !== null && _d !== void 0 ? _d : [];
        const dto = new product_dto_1.CreateProductDTO(req.body.name, req.body.description, materials.map((m) => new product_dto_1.Material(m.name, parseInt(m.quantity))));
        const product = yield product_service_1.default.updateProduct(name, dto);
        const payload = new payload_1.Payload(`Product ${name} successfully updated`, product);
        res.status(200).json(payload);
    }
    catch (e) {
        next(e);
    }
});
const deleteProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    try {
        validation_1.default.validateAdminRole((_e = req.payload) === null || _e === void 0 ? void 0 : _e.level);
        yield validation_1.default.validateProductNameParam(req);
        const validateKey = req.header('HX-Prompt') || '';
        const name = req.params.name;
        if (validateKey !== name) {
            throw new response_error_1.ResponseError(422, 'The provided prompt does not match the ID to be deleted');
        }
        const product = yield product_service_1.default.deleteProduct(name);
        const payload = new payload_1.Payload(`Product ${name} successfully deleted`, product);
        res.status(200).json(payload);
    }
    catch (e) {
        next(e);
    }
});
exports.default = {
    createProduct,
    readAllProducts,
    readProductDetails,
    updateProduct,
    deleteProduct,
};
