"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.History = void 0;
class History {
    constructor(quantity, product, warehouse, transaction, id, createdAt, updatedAt) {
        this.quantity = quantity;
        this.transaction = transaction;
        this.product = product;
        this.warehouse = warehouse;
        this.id = id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
exports.History = History;
