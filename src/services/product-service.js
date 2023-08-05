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
const response_error_1 = require("../dto/response-error");
const bom_1 = require("../models/bom");
const product_repository_1 = __importDefault(require("../repositories/product-repository"));
const inventory_repository_1 = __importDefault(require("../repositories/inventory-repository"));
const createProduct = (dto) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield product_repository_1.default.findProductByName(dto.name)) {
        throw new response_error_1.ResponseError(409, `Product ${dto.name} is already exist`, dto);
    }
    return yield database_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const product = yield product_repository_1.default.createProduct(dto.mapToProduct(), tx);
        if (dto.needs) {
            yield product_repository_1.default.upsertManyProductByName(dto.needs.map((p) => p.mapToProduct()), tx);
            yield product_repository_1.default.connectMaterials(dto.needs.map(m => new bom_1.BomMany(product.name, m.name, m.quantity)), tx);
            product.needs = dto.needs;
        }
        return product;
    }));
});
const readAllProducts = (name) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_repository_1.default.readAllProducts(name);
});
const readProductDetails = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_repository_1.default.readProductDetails(name);
    if (!product) {
        throw new response_error_1.ResponseError(404, `Product ${name} not found`);
    }
    return product;
});
const readProductAndMaterial = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_repository_1.default.readProductAndMaterial(name);
    if (!product) {
        throw new response_error_1.ResponseError(404, `Product ${name} not found`);
    }
    return product;
});
const updateProduct = (originalName, dto) => __awaiter(void 0, void 0, void 0, function* () {
    const originalProduct = yield product_repository_1.default.findProductByName(originalName);
    if (!originalProduct) {
        throw new response_error_1.ResponseError(409, `Product ${originalName} is not exist`);
    }
    const isProduct = yield product_repository_1.default.findProductByName(dto.name);
    if (isProduct && isProduct.name != originalName) {
        throw new response_error_1.ResponseError(409, `Product ${originalName} is already exist`);
    }
    return yield database_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        let updatedProduct = yield product_repository_1.default
            .updateProductByName(originalName, dto.mapToProduct(), tx);
        if (dto.needs) {
            yield product_repository_1.default.upsertManyProductByName(dto.needs.map((p) => p.mapToProduct()), tx);
            yield product_repository_1.default.connectMaterials(dto.needs.map(m => new bom_1.BomMany(dto.name, m.name, m.quantity)), tx);
            updatedProduct.needs = dto.needs;
        }
        return updatedProduct;
    }));
});
const deleteProduct = (name) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_repository_1.default.deleteProductByName(name);
});
const getAllMaterials = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_repository_1.default.getAllMaterials();
});
const getAllFinishGoods = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_repository_1.default.getAllFinishGoods();
});
const findMaterials = (productName) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_repository_1.default.findMaterials(productName);
});
const getProductMaterialsWithStock = (productName) => __awaiter(void 0, void 0, void 0, function* () {
    const materials = yield findMaterials(productName);
    const inventories = yield inventory_repository_1.default.getInvetoryOfProducts(materials.map(m => m.materialName));
    return mapForProductionForm(inventories, materials);
});
function mapForProductionForm(inventories, materials) {
    let counter = 0;
    const data = inventories.reduce((result, item) => {
        if (!result[item.productId]) {
            result[item.productId] = {
                name: item.productId,
                quantity: materials[counter].quantity,
                inventory: [],
            };
            counter++;
        }
        result[item.productId].inventory.push({
            location: item.warehouseId,
            stock: item.quantity,
        });
        return result;
    }, {});
    return Object.values(data);
}
exports.default = {
    createProduct,
    readAllProducts,
    readProductDetails,
    readProductAndMaterial,
    updateProduct,
    deleteProduct,
    getAllMaterials,
    getAllFinishGoods,
    findMaterials,
    getProductMaterialsWithStock,
};
