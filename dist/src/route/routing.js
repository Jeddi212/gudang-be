"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.privateRouter = void 0;
const express_1 = __importDefault(require("express"));
const view_controller_1 = __importDefault(require("../controllers/view-controller"));
const privateRouter = express_1.default.Router();
exports.privateRouter = privateRouter;
// STAFF
privateRouter.get('/add-stock', view_controller_1.default.addStock);
privateRouter.get('/production', view_controller_1.default.production);
privateRouter.post('/production-form', view_controller_1.default.productionForm);
// privateRouter.post('/post/transaction', viewController.createTransaction)
// ADMIN
privateRouter.get('/post/warehouse', view_controller_1.default.createWarehouseForm);
// privateRouter.post('/warehouse', viewController.createWarehouse)
// privateRouter.put('/warehouse/:location', viewController.updateWarehouse)
// privateRouter.delete('/warehouse/:location', viewController.deleteWarehouse)
privateRouter.get('/post/product', view_controller_1.default.createProductForm);
// privateRouter.post('/product', viewController.createProduct)
privateRouter.get('/put/product/:name', view_controller_1.default.updateProductForm);
