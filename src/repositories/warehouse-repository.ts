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

const updateWarehouse = async (original: string, wh: Warehouse) => {
    return prisma.warehouse.update({
        where: { location: original },
        data: { location: wh.location }
    })
}

const deleteWarehouseById = async (location: string) => {
    return prisma.warehouse.delete({
        where: { location: location }
    })
}

export default {
    createNewWarehouse,
    readWarehouses,
    updateWarehouse,
    deleteWarehouseById,
}