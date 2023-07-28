import { WarehouseDTO } from '../dto/warehouse-dto';
import { Warehouse } from '../models/warehouse';
import whRepository from '../repositories/warehouse-repository';

const createWarehouse = async (dto: WarehouseDTO) => {
    const wh: Warehouse = await whRepository.createNewWarehouse(dto.mapToModel())
    return new Warehouse(wh.location)
}

const readWarehouses = async (location: string) => {
    const wh = await whRepository.readWarehouses(location)
    return wh.map(w => new Warehouse(w.location))
}

const updateWarehouse = async (original: string, dto: WarehouseDTO) => {
    const wh = await whRepository.updateWarehouse(original, dto.mapToModel())
    return new Warehouse(wh.location)
}

const deleteWarehouse = async (location: string) => {
    const wh = await whRepository.deleteWarehouseById(location)
    return new Warehouse(wh.location)
}

export default {
    createWarehouse,
    readWarehouses,
    updateWarehouse,
    deleteWarehouse,
}