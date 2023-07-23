import { prisma } from '../utils/database'
import { Warehouse } from '../models/warehouse'

const createNewWarehouse = async (wh: Warehouse) => {
    return prisma.warehouse.create({ data: wh })
}

export default {
    createNewWarehouse
}