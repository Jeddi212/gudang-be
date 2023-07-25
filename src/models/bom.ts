import { Prisma } from "@prisma/client"
import { Product } from "./product"

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
    productId: number
    materialId: number
    quantity: number

    constructor(productId: number, materialId: number, quantity: number) {
        this.productId = productId
        this.materialId = materialId
        this.quantity = quantity
    }

    public static createBOMs(productId: number, materials: any[]) {
        return materials.map(m => new BomMany(productId, m.id, m.quantity))
    }
}

export {
    BOM,
    BomMany,
}