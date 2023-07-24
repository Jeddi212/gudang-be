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

const updateWarehouse = async (wh: Warehouse) => {
    return prisma.warehouse.update({
        where: { id: wh.id },
        data: { location: wh.location }
    })
}

const deleteWarehouseById = async (id: number) => {
    return prisma.warehouse.delete({
        where: { id: id }
    })
}

export default {
    createNewWarehouse,
    readWarehouses,
    updateWarehouse,
    deleteWarehouseById,
}