import { ResponseError } from '../dto/response-error'
import { WarehouseDTO } from '../dto/warehouse-dto';
import { Warehouse } from '../models/warehouse';
import whRepository from '../repositories/warehouse-repository';

const createWarehouse = async (dto: WarehouseDTO) => {
    const wh = await whRepository.createNewWarehouse(dto.mapToModel())
    return new Warehouse(wh.location, wh.id)
}

const readWarehouses = async (location: any) => {
    const wh = await whRepository.readWarehouses(location)
    return wh.map(w => new Warehouse(w.location, w.id))
}

const updateWarehouse = async (wh: Warehouse) => {
    return await whRepository.updateWarehouse(wh)
}

export default {
    createWarehouse,
    readWarehouses,
    updateWarehouse,
}