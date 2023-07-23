import { ResponseError } from '../dto/response-error'
import { WarehouseDTO } from '../dto/warehouse-dto';
import { Warehouse } from '../models/warehouse';
import whRepository from '../repositories/warehouse-repository';

const createWarehouse = async (dto: WarehouseDTO) => {
    const wh = await whRepository.createNewWarehouse(dto.mapToModel())
    return new Warehouse(wh.location, wh.id)
}

export default {
    createWarehouse
}