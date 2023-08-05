"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WarehouseDTO = void 0;
const warehouse_1 = require("../models/warehouse");
class WarehouseDTO {
    constructor(location) {
        this.location = location;
    }
    mapToModel() { return new warehouse_1.Warehouse(this.location); }
}
exports.WarehouseDTO = WarehouseDTO;
