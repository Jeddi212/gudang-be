import { Payload } from '../dto/payload'
import { Request, Response, NextFunction } from 'express'
import { WarehouseDTO } from '../dto/warehouse-dto'
import whService from '../services/warehouse-service'
import validation from '../utils/validation'
import { Warehouse } from '../models/warehouse'

const createWarehouse = async (req: Request, res: Response, next: NextFunction) => {
    try {
        validation.validateAdminRole(req.payload?.level)
        validation.validateWarehouse(req)
        const dto: WarehouseDTO = new WarehouseDTO(req.body.location)

        const wh: Warehouse = await whService.createWarehouse(dto)
        const payload: Payload = new Payload('Warehouse created', wh)

        res.status(200).json(payload)
    } catch (e) {
        next(e)
    }
}

export default {
    createWarehouse
}