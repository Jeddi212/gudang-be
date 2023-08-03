import { ResponseError } from '../dto/response-error';
import { WarehouseDTO } from '../dto/warehouse-dto';
import { Warehouse } from '../models/warehouse';
import whRepository from '../repositories/warehouse-repository';

const createWarehouse = async (dto: WarehouseDTO) => {
    if (await whRepository.findWarehouseByLocation(dto.location)) {
        throw new ResponseError(409, `Warehouse ${dto.location} already exist`, dto)
    }

    const warehouse: Warehouse = await whRepository.createNewWarehouse(dto.mapToModel())
    return new Warehouse(warehouse.location)
}

const readWarehouses = async () => {
    const warehouse = await whRepository.readWarehouses()
    return warehouse.map(w => new Warehouse(w.location))
}

const readWarehouseSorted = async () => {
    const warehouse = await whRepository.readWarehouseSorted()
    return warehouse.map(w => new Warehouse(w.location))
}

const findWarehouseByLocation = async (location: string) => {
    const warehouse = await whRepository.readWarehouseDetail(location)
    if (!warehouse) {
        throw new ResponseError(404, `Warehouse ${location} not found`, warehouse);
    }

    return warehouse
}

const updateWarehouse = async (original: string, dto: WarehouseDTO) => {
    if (!await whRepository.findWarehouseByLocation(original)) {
        throw new ResponseError(409, `Warehouse ${original} is not exist`, {
            "current": original,
            "updated": dto
        })
    }

    if (await whRepository.findWarehouseByLocation(dto.location)) {
        throw new ResponseError(409, `Warehouse ${dto.location} already exist`, {
            "current": original,
            "updated": dto
        })
    }

    const warehouse = await whRepository.updateWarehouse(original, dto.mapToModel())
    return new Warehouse(warehouse.location)
}

const deleteWarehouse = async (location: string) => {
    if (!await whRepository.findWarehouseByLocation(location)) {
        throw new ResponseError(409, `Warehouse ${location} is not exist`)
    }

    const warehouse = await whRepository.deleteWarehouseByLocation(location)
    return new Warehouse(warehouse.location)
}

export default {
    createWarehouse,
    readWarehouses,
    readWarehouseSorted,
    findWarehouseByLocation,
    updateWarehouse,
    deleteWarehouse,
}