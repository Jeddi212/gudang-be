"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Material = exports.CreateProductDTO = void 0;
const product_1 = require("../models/product");
class CreateProductDTO {
    constructor(name, description, needs) {
        this.stock = 0;
        this.name = name;
        this.description = description;
        this.needs = needs;
    }
    mapToProduct() { return new product_1.Product(this.name, this.stock, this.description); }
}
exports.CreateProductDTO = CreateProductDTO;
class Material {
    constructor(name, quantity) {
        this.name = name;
        this.quantity = quantity;
    }
    mapToProduct() { return new product_1.Product(this.name, 0); }
}
exports.Material = Material;
