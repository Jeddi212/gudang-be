import { Payload } from '../dto/payload'
import { Request, Response, NextFunction } from 'express'
import { WarehouseDTO } from '../dto/warehouse-dto'
import { Warehouse } from '../models/warehouse'
import validation from '../utils/validation'
import whService from '../services/warehouse-service'
import { ResponseError } from '../dto/response-error'

const createWarehouse = async (req: Request, res: Response, next: NextFunction) => {
    try {
        validation.validateAdminRole(req.payload?.level)
        await validation.validateWarehouse(req)
        const dto: WarehouseDTO = new WarehouseDTO(req.body.location)

        const warehouse: Warehouse = await whService.createWarehouse(dto)
        const payload: Payload = new Payload(`Warehouse ${dto.location} created`, warehouse)

        res.status(200).json(payload)
    } catch (e) {
        next(e)
    }
}

const readWarehouses = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const warehouse: Warehouse[] = await whService.readWarehouses()
        const payload: Payload = new Payload(`Read all warehouse success`, warehouse)

        res.status(200).json(payload)
    } catch (e) {
        next(e)
    }
}

const readWarehouseByLocation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await validation.validateWarehouseLocationParam(req)
        const location: string = req.params.location

        const warehouse: Warehouse = await whService.findWarehouseByLocation(location)
        const payload: Payload = new Payload(`Warehouse ${location} successfully fetched`, warehouse)

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

        const warehouse: Warehouse = await whService.updateWarehouse(original, dto)
        const payload: Payload = new Payload(`Warehouse ${original} successfully updated`, warehouse)

        res.status(200).json(payload)
    } catch (e) {
        next(e)
    }
}

const deleteWarehouse = async (req: Request, res: Response, next: NextFunction) => {
    try {
        validation.validateAdminRole(req.payload?.level)
        await validation.validateDeleteWarehouse(req)
        const validateKey: string = req.header('HX-Prompt') || ''
        const location: string = req.params.location

        if (validateKey !== location) {
            throw new ResponseError(422, 'The provided prompt does not match the ID to be deleted')
        }

        const warehouse: Warehouse = await whService.deleteWarehouse(location)
        const payload: Payload = new Payload(`Warehouse ${location} successfully deleted`, warehouse)

        res.status(200).json(payload)
    } catch (e) {
        next(e)
    }
}

export default {
    createWarehouse,
    readWarehouses,
    readWarehouseByLocation,
    updateWarehouse,
    deleteWarehouse,
}