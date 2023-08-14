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
const transaction_service_1 = __importDefault(require("../services/transaction-service"));
const inventory_service_1 = __importDefault(require("../services/inventory-service"));
const product_service_1 = __importDefault(require("../services/product-service"));
const transaction_service_2 = __importDefault(require("../services/transaction-service"));
const warehouse_service_1 = __importDefault(require("../services/warehouse-service"));
const validation_1 = __importDefault(require("../utils/validation"));
// GUEST VIEW
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.payload;
    res.render('index', {
        user,
        title: 'Gudang',
        layout: './layouts/main-layout'
    });
});
const login = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render('./guest/login', {
        title: 'Gudang | Login',
        layout: './layouts/main-layout'
    });
});
const register = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render('./guest/register', {
        title: 'Gudang | Register',
        layout: './layouts/main-layout'
    });
});
const warehouse = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const warehouse = yield warehouse_service_1.default.readWarehouses();
        res.status(200).render('./guest/warehouse', {
            warehouse,
            title: 'Gudang | Warehouse',
            layout: './layouts/main-hyperscript'
        });
    }
    catch (e) {
        next(e);
    }
});
const warehouseDetail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield validation_1.default.validateWarehouseLocationParam(req);
        const user = req.payload;
        const location = req.params.location;
        const warehouse = yield warehouse_service_1.default.findWarehouseByLocation(location);
        res.status(200).render('./guest/warehouse-detail', {
            user,
            warehouse,
            title: warehouse.location,
            layout: './layouts/main-hyperscript'
        });
    }
    catch (e) {
        next(e);
    }
});
const product = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield validation_1.default.validateProductNameQuery(req);
        const name = req.query.name || '';
        const product = yield product_service_1.default.readAllProducts(name);
        res.status(200).render('./guest/product', {
            product,
            title: 'Gudang | Product',
            layout: './layouts/main-hyperscript'
        });
    }
    catch (e) {
        next(e);
    }
});
const productDetail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield validation_1.default.validateProductNameParam(req);
        const user = req.payload;
        const name = req.params.name;
        const product = yield product_service_1.default.readProductDetails(name);
        res.status(200).render('./guest/product-detail', {
            user,
            product,
            title: product.name,
            layout: './layouts/main-layout'
        });
    }
    catch (e) {
        next(e);
    }
});
const transaction = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.render('./guest/transaction', {
            title: 'Gudang | Transaction',
            layout: './layouts/main-layout'
        });
    }
    catch (e) {
        next(e);
    }
});
const transactionData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const event = req.query.event || '';
        const username = req.query.username || '';
        let transactions = yield transaction_service_2.default.findTransactions(event, username);
        res.render('./guest/transaction-data', {
            transactions,
            title: 'Gudang | Transaction',
            layout: './layouts/plain-layout'
        });
    }
    catch (e) {
        next(e);
    }
});
const transactionDetail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield validation_1.default.validateTransactionId(req);
        const id = parseInt(req.params.id);
        const transactions = yield transaction_service_1.default.findTransactionById(id);
        res.render('./guest/transaction-detail', {
            transactions,
            title: `Transaction ${transactions === null || transactions === void 0 ? void 0 : transactions.id}`,
            layout: './layouts/main-layout'
        });
    }
    catch (e) {
        next(e);
    }
});
const inventory = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const inventories = yield inventory_service_1.default.readAllInventories();
        res.render('./guest/inventory', {
            inventories,
            title: 'Gudang | Inventory',
            layout: './layouts/main-hyperscript'
        });
    }
    catch (e) {
        next(e);
    }
});
// STAFF VIEW
const addStock = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const materials = yield product_service_1.default.getAllMaterials();
        const warehouses = yield warehouse_service_1.default.readWarehouses();
        res.render('./staff/add-stock', {
            materials,
            warehouses,
            title: 'Add Stock',
            layout: './layouts/main-vanilla'
        });
    }
    catch (e) {
        next(e);
    }
});
const production = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_service_1.default.getAllFinishGoods();
        const warehouses = yield warehouse_service_1.default.readWarehouses();
        res.render('./staff/production', {
            products,
            warehouses,
            title: 'Production',
            layout: './layouts/main-hyperscript'
        });
    }
    catch (e) {
        next(e);
    }
});
const productionForm = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = req.body.product[0] ? req.body.product[0] : req.body.product;
        const materials = yield product_service_1.default.getProductMaterialsWithStock(product);
        res.render('./staff/production-form', {
            materials,
            title: 'Material',
            layout: './layouts/plain-layout'
        });
    }
    catch (e) {
        next(e);
    }
});
const selling = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_service_1.default.getProductListHasStock();
        res.render('./staff/selling', {
            products,
            title: 'Selling',
            layout: './layouts/main-hyperscript'
        });
    }
    catch (e) {
        next(e);
    }
});
const sellingForm = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productName = req.body.productName;
        const product = yield product_service_1.default.getFinishGoodsWithStock(productName);
        res.render('./staff/selling-form', {
            product,
            title: 'Detail',
            layout: './layouts/plain-layout'
        });
    }
    catch (e) {
        next(e);
    }
});
// ADMIN VIEW
const createWarehouseForm = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.render('./admin/createWarehouse', {
            title: 'Create Warehouse',
            layout: './layouts/main-layout'
        });
    }
    catch (e) {
        next(e);
    }
});
const createProductForm = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield product_service_1.default.readAllProducts('');
    try {
        res.render('./admin/createProduct', {
            products,
            title: 'Create Product',
            layout: './layouts/main-vanilla'
        });
    }
    catch (e) {
        next(e);
    }
});
const updateProductForm = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield validation_1.default.validateProductNameParam(req);
    const productName = req.params.name;
    const productList = yield product_service_1.default.readAllProducts('');
    const product = yield product_service_1.default.readProductAndMaterial(productName);
    try {
        res.render('./admin/updateProduct', {
            product,
            productList,
            title: 'Update Product',
            layout: './layouts/main-vanilla'
        });
    }
    catch (e) {
        next(e);
    }
});
exports.default = {
    index,
    login,
    register,
    warehouse,
    warehouseDetail,
    product,
    productDetail,
    transaction,
    transactionDetail,
    transactionData,
    inventory,
    addStock,
    production,
    productionForm,
    selling,
    sellingForm,
    createWarehouseForm,
    createProductForm,
    updateProductForm,
};
