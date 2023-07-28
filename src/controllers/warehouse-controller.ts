import { Payload } from '../dto/payload'
import { Request, Response, NextFunction } from 'express'
import { WarehouseDTO } from '../dto/warehouse-dto'
import { Warehouse } from '../models/warehouse'
import validation from '../utils/validation'
import whService from '../services/warehouse-service'

const createWarehouse = async (req: Request, res: Response, next: NextFunction) => {
    try {
        validation.validateAdminRole(req.payload?.level)
        await validation.validateWarehouse(req)
        const dto: WarehouseDTO = new WarehouseDTO(req.body.location)

        const wh: Warehouse = await whService.createWarehouse(dto)
        const payload: Payload = new Payload('Warehouse created', wh)

        res.status(200).json(payload)
    } catch (e) {
        next(e)
    }
}

const readWarehouses = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const location = req.query.location as string || ''

        const wh: Warehouse[] = await whService.readWarehouses(location)
        const payload: Payload = new Payload('Read all warehouse success', wh)

        res.status(200).json(payload)
    } catch (e) {
        next(e)
    }
}

const updateWarehouse = async (req: Request, res: Response, next: NextFunction) => {
    try {
        validation.validateAdminRole(req.payload?.level)
        await validation.validateUpdateWarehouse(req)
        const original = req.params.location
        const dto: WarehouseDTO = new WarehouseDTO(req.body.location)

        const wh: Warehouse = await whService.updateWarehouse(original, dto)
        const payload: Payload = new Payload('Warehouse successfully updated', wh)

        res.status(200).json(payload)
    } catch (e) {
        next(e)
    }
}

const deleteWarehouse = async (req: Request, res: Response, next: NextFunction) => {
    try {
        validation.validateAdminRole(req.payload?.level)
        await validation.validateDeleteWarehouse(req)
        const location: string = req.params.id

        const wh: Warehouse = await whService.deleteWarehouse(location)
        const payload: Payload = new Payload('Warehouse successfully deleted', wh)

        res.status(200).json(payload)
    } catch (e) {
        next(e)
    }
}

export default {
    createWarehouse,
    readWarehouses,
    updateWarehouse,
    deleteWarehouse,
}