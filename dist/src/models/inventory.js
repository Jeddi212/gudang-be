"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inventory = void 0;
class Inventory {
    constructor(quantity, product, warehouse, id, createdAt, updatedAt) {
        this.quantity = quantity;
        this.product = product;
        this.warehouse = warehouse;
        this.id = id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
exports.Inventory = Inventory;
