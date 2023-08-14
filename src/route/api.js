"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.privateApi = void 0;
const express_1 = __importDefault(require("express"));
const transaction_controller_1 = __importDefault(require("../controllers/transaction-controller"));
const product_controller_1 = __importDefault(require("../controllers/product-controller"));
const warehouse_controller_1 = __importDefault(require("../controllers/warehouse-controller"));
const auth_middleware_1 = require("../middleware/auth-middleware");
const privateApi = express_1.default.Router();
exports.privateApi = privateApi;
privateApi.use(auth_middleware_1.authMiddleware);
// STAFF
privateApi.post('/api/transaction', transaction_controller_1.default.createTransaction);
// ADMIN
privateApi.post('/api/warehouse', warehouse_controller_1.default.createWarehouse);
privateApi.put('/api/warehouse/:location', warehouse_controller_1.default.updateWarehouse);
privateApi.delete('/api/warehouse/:location', warehouse_controller_1.default.deleteWarehouse);
privateApi.post('/api/product', product_controller_1.default.createProduct);
privateApi.put('/api/product/:name', product_controller_1.default.updateProduct);
privateApi.delete('/api/product/:name', product_controller_1.default.deleteProduct);
privateApi.put('/api/transaction/:id', transaction_controller_1.default.updateTransaction);
