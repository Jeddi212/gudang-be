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
const response_error_1 = require("../dto/response-error");
const findProductByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    return yield database_1.prisma.product.findFirst({ where: { name: name } });
});
const createProduct = (product, tx) => __awaiter(void 0, void 0, void 0, function* () {
    const client = tx ? tx : database_1.prisma;
    try {
        return yield client.product.create({
            data: product
        });
    }
    catch (error) {
        yield client.$queryRaw `ROLLBACK;`;
        throw new response_error_1.ResponseError(500, 'Error during upsert materials', error);
    }
});
const upsertManyProductByName = (products, tx) => __awaiter(void 0, void 0, void 0, function* () {
    const client = tx ? tx : database_1.prisma;
    try {
        for (const p of products) {
            yield client.product.upsert({
                where: { name: p.name },
                update: {},
                create: { name: p.name, stock: p.stock || 0 }
            });
        }
    }
    catch (error) {
        yield client.$queryRaw `ROLLBACK;`;
        throw new response_error_1.ResponseError(500, 'Error during upsert materials', error);
    }
});
const connectMaterials = (boms, tx) => __awaiter(void 0, void 0, void 0, function* () {
    const client = tx ? tx : database_1.prisma;
    try {
        return yield client.bOM.createMany({
            data: boms
        });
    }
    catch (error) {
        yield client.$queryRaw `ROLLBACK;`;
        throw new response_error_1.ResponseError(500, 'Error during connect materials', error);
    }
});
const readAllProducts = (name) => __awaiter(void 0, void 0, void 0, function* () {
    return database_1.prisma.product.findMany({
        where: { name: { contains: name } },
        orderBy: { name: 'asc' }
    });
});
const readProductDetails = (name) => __awaiter(void 0, void 0, void 0, function* () {
    return database_1.prisma.product.findFirst({
        where: { name: name },
        include: {
            Needs: {
                select: { materialName: true, quantity: true }
            },
            UsedBy: {
                select: { productName: true }
            },
            Inventory: {
                orderBy: { updatedAt: 'desc' },
            },
            History: {
                orderBy: { updatedAt: 'desc' },
                take: 25
            },
        }
    });
});
const readProductAndMaterial = (name) => __awaiter(void 0, void 0, void 0, function* () {
    return database_1.prisma.product.findFirst({
        where: { name: name },
        include: {
            Needs: {
                select: { materialName: true, quantity: true }
            }
        }
    });
});
const updateProductByName = (originalName, product, tx) => __awaiter(void 0, void 0, void 0, function* () {
    const client = tx ? tx : database_1.prisma;
    try {
        return yield client.product.update({
            where: { name: originalName },
            data: {
                name: product.name,
                description: product.description,
                Needs: { deleteMany: {} }
                // stock: product.stock,
            }
        });
    }
    catch (error) {
        yield client.$queryRaw `ROLLBACK;`;
        throw new response_error_1.ResponseError(500, 'Error during update product by name', error);
    }
});
const deleteProductByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    return yield database_1.prisma.product.delete({
        where: { name: name },
        include: {
            Needs: {
                select: { materialName: true, quantity: true }
            },
            UsedBy: {
                select: { productName: true }
            },
            Inventory: {
                orderBy: { updatedAt: 'desc' },
            },
            History: {
                orderBy: { updatedAt: 'desc' },
            },
        }
    });
});
const updateManyProductStock = (tx, products) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        for (const p of products) {
            yield tx.product.update({
                where: { name: p.product },
                data: { stock: { increment: p.quantity } },
            });
        }
    }
    catch (error) {
        yield tx.$queryRaw `ROLLBACK;`;
        throw new response_error_1.ResponseError(500, 'Error during update product stock', error);
    }
});
const disconnectMaterial = (productName) => __awaiter(void 0, void 0, void 0, function* () {
    return yield database_1.prisma.bOM.deleteMany({
        where: { productName: productName }
    });
});
const findMaterials = (productName) => __awaiter(void 0, void 0, void 0, function* () {
    return yield database_1.prisma.bOM.findMany({
        where: { productName: productName },
        orderBy: { productName: 'asc' }
    });
});
const getAllRawMaterial = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield database_1.prisma.product.findMany({
        select: { name: true },
        where: { NOT: { Needs: { some: {} } } },
        orderBy: { name: 'asc' }
    });
});
const getAllMaterials = () => __awaiter(void 0, void 0, void 0, function* () {
    const uniqueFinishGoods = yield database_1.prisma.bOM.findMany({
        select: { materialName: true },
        distinct: ['materialName'],
        orderBy: { materialName: 'asc' }
    });
    return uniqueFinishGoods.map((item) => item.materialName);
});
const getAllFinishGoods = () => __awaiter(void 0, void 0, void 0, function* () {
    const uniqueFinishGoods = yield database_1.prisma.bOM.findMany({
        select: { productName: true },
        distinct: ['productName'],
        orderBy: { productName: 'asc' }
    });
    return uniqueFinishGoods.map((item) => item.productName);
});
exports.default = {
    findProductByName,
    createProduct,
    upsertManyProductByName,
    connectMaterials,
    readAllProducts,
    readProductDetails,
    readProductAndMaterial,
    updateProductByName,
    disconnectMaterial,
    findMaterials,
    deleteProductByName,
    updateManyProductStock,
    getAllRawMaterial,
    getAllMaterials,
    getAllFinishGoods,
};
