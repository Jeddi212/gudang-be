"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
class Product {
    constructor(name, stock, description, needs, usedBy, history) {
        this.name = name;
        this.stock = stock;
        this.description = description;
        this.needs = needs;
        this.usedBy = usedBy;
        this.history = history;
    }
}
exports.Product = Product;
