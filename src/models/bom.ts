import { Product } from "./product"
import { Material } from "../dto/product-dto"

class BOM {
    product: Product
    material: Product
    quantity: number

    constructor(product: Product, material: Product, quantity: number) {
        this.product = product
        this.material = material
        this.quantity = quantity
    }
}

class BomMany {
    productName: string
    materialName: string
    quantity: number

    constructor(productName: string, materialName: string, quantity: number) {
        this.productName = productName
        this.materialName = materialName
        this.quantity = quantity
    }

    public static createBOMs(productName: string, materials: Material[]) {
        return materials.map(m => new BomMany(productName, m.name, m.quantity))
    }
}

export {
    BOM,
    BomMany,
}