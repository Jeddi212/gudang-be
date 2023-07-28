import { Payload } from '../dto/payload'
import { Request, Response, NextFunction } from 'express'
import { HistoryDTO } from '../dto/history-dto'
import { InventoryDTO } from '../dto/inventory-dto'
import historyService from '../services/history-service'
import validation from '../utils/validation'

const createHistory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        validation.validateCreateHistory(req)

        const inventory = req.body.inventory ?? [];
        const dto: HistoryDTO = new HistoryDTO(
            req.body.event,
            req.payload?.name as string,
            inventory.map((i: InventoryDTO) => new InventoryDTO(i.quantity, i.product, i.warehouse)))

        const product = await historyService.createHistory(dto)
        const payload: Payload = new Payload(`History successfully created`, product)

        res.status(200).json(payload)
    } catch (e) {
        next(e)
    }
}

export default {
    createHistory,
}