import { Payload } from '../dto/payload'
import { Request, Response, NextFunction } from 'express'
import { TransactionDTO } from '../dto/transaction-dto'
import { HistoryDTO } from '../dto/history-dto'
import historyService from '../services/transaction-service'
import validation from '../utils/validation'

const createTransaction = async (req: Request, res: Response, next: NextFunction) => {
    try {
        validation.validateCreateHistory(req)

        const inventory = req.body.inventory ?? [];
        const dto: TransactionDTO = new TransactionDTO(
            req.body.event,
            req.payload?.name as string,
            inventory.map((i: HistoryDTO) => new HistoryDTO(i.quantity, i.product, i.warehouse)))

        const result = await historyService.createTransaction(dto)
        const payload: Payload = new Payload(`History successfully created`, result)

        res.status(200).json(payload)
    } catch (e) {
        next(e)
    }
}

export default {
    createTransaction,
}