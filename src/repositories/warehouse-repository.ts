import { prisma } from '../utils/database'
import { Warehouse } from '../models/warehouse'

const createNewWarehouse = async (wh: Warehouse) => {
    return prisma.warehouse.create({ data: wh })
}

const readWarehouses = async (location: any) => {
    return prisma.warehouse.findMany({
        where: { location: { contains: location } }
    })
}

export default {
    createNewWarehouse,
    readWarehouses
}