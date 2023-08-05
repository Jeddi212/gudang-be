"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryDTO = void 0;
class InventoryDTO {
    constructor(quantity, product, warehouse, transaction) {
        this.quantity = quantity;
        this.product = product;
        this.warehouse = warehouse;
        this.transaction = transaction;
    }
}
exports.InventoryDTO = InventoryDTO;
