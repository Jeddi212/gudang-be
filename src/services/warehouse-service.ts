import { ResponseError } from '../dto/response-error';
import { WarehouseDTO } from '../dto/warehouse-dto';
import { Warehouse } from '../models/warehouse';
import whRepository from '../repositories/warehouse-repository';

const createWarehouse = async (dto: WarehouseDTO) => {
    if (await whRepository.findWarehouseByLocation(dto.location)) {
        throw new ResponseError(409, `Warehouse ${dto.location} already exist`, dto)
    }

    const wh: Warehouse = await whRepository.createNewWarehouse(dto.mapToModel())
    return new Warehouse(wh.location)
}

const readWarehouses = async (location: string) => {
    const wh = await whRepository.readWarehouses(location)
    return wh.map(w => new Warehouse(w.location))
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

    const wh = await whRepository.updateWarehouse(original, dto.mapToModel())
    return new Warehouse(wh.location)
}

const deleteWarehouse = async (location: string) => {
    if (!await whRepository.findWarehouseByLocation(location)) {
        throw new ResponseError(409, `Warehouse ${location} is not exist`)
    }

    const wh = await whRepository.deleteWarehouseByLocation(location)
    return new Warehouse(wh.location)
}

export default {
    createWarehouse,
    readWarehouses,
    updateWarehouse,
    deleteWarehouse,
}