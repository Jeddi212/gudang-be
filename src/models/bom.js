"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BomMany = exports.BOM = void 0;
class BOM {
    constructor(product, material, quantity) {
        this.product = product;
        this.material = material;
        this.quantity = quantity;
    }
}
exports.BOM = BOM;
class BomMany {
    constructor(productName, materialName, quantity) {
        this.productName = productName;
        this.materialName = materialName;
        this.quantity = quantity;
    }
    static createBOMs(productName, materials) {
        return materials.map(m => new BomMany(productName, m.name, m.quantity));
    }
}
exports.BomMany = BomMany;
