"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicApi = void 0;
const express_1 = __importDefault(require("express"));
const inventory_controller_1 = __importDefault(require("../controllers/inventory-controller"));
const product_controller_1 = __importDefault(require("../controllers/product-controller"));
const transaction_controller_1 = __importDefault(require("../controllers/transaction-controller"));
const warehouse_controller_1 = __importDefault(require("../controllers/warehouse-controller"));
const user_controller_1 = __importDefault(require("../controllers/user-controller"));
const publicApi = express_1.default.Router();
exports.publicApi = publicApi;
publicApi.post('/api/register', user_controller_1.default.register);
publicApi.post('/api/login', user_controller_1.default.login);
publicApi.get('/api/warehouse', warehouse_controller_1.default.readWarehouses);
publicApi.get('/api/warehouse/:location', warehouse_controller_1.default.readWarehouseByLocation);
publicApi.get('/api/product', product_controller_1.default.readAllProducts);
publicApi.get('/api/product/:name', product_controller_1.default.readProductDetails);
publicApi.get('/api/transaction', transaction_controller_1.default.findTransactions);
publicApi.get('/api/transaction/:id', transaction_controller_1.default.findTransactionById);
publicApi.get('/api/inventory', inventory_controller_1.default.readAllInventories);
