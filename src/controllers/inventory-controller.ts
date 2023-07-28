import { Payload } from '../dto/payload'
import { Request, Response, NextFunction } from 'express'
import inventoryService from '../services/inventory-service'

const readAllInventories = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const inventories = await inventoryService.readAllInventories()
        const payload: Payload = new Payload(`Inventories successfully fetched`, inventories)

        res.status(200).json(payload)
    } catch (e) {
        next(e)
    }
}

export default {
    readAllInventories,
}