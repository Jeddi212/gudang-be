import { Event } from '@prisma/client'
import { Request, Response, NextFunction } from 'express'
import { Payload } from '../dto/payload'
import { HistoryDTO } from '../dto/history-dto'
import { TransactionDTO, UpdateTransactionDTO } from '../dto/transaction-dto'
import validation from '../utils/validation'
import historyService from '../services/transaction-service'
import transactionService from '../services/transaction-service'

const createTransaction = async (req: Request, res: Response, next: NextFunction) => {
    try {
        validation.validateCreateTransaction(req)

        const inventory = req.body.inventory ?? []
        const dto: TransactionDTO = new TransactionDTO(
            req.body.event,
            req.payload?.name as string,
            inventory.map((i: HistoryDTO) => new HistoryDTO(i.quantity, i.product, i.warehouse)))

        const result = await historyService.createTransaction(dto)
        const payload: Payload = new Payload(`Transaction successfully created`, result)

        res.status(200).json(payload)
    } catch (e) {
        next(e)
    }
}

const findTransactions = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const event = req.query.event as Event || ''
        const username = req.query.username as string || ''

        let transactions = await transactionService.findTransactions(event, username)

        const payload: Payload = new Payload(`Transactions successfully fetched`, transactions)

        res.status(200).json(payload)
    } catch (e) {
        next(e)
    }
}

const findTransactionById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await validation.validateTransactionId(req)
        const id = parseInt(req.params.id)

        const transactions = await historyService.findTransactionById(id)
        const payload: Payload = new Payload(`Transactions ${id} successfully fetched`, transactions)

        res.status(200).json(payload)
    } catch (e) {
        next(e)
    }
}

const updateTransaction = async (req: Request, res: Response, next: NextFunction) => {
    try {
        validation.validateAdminRole(req.payload?.level)

        await validation.validateTransactionId(req)
        await validation.validateUpdateTransaction(req)

        const id = parseInt(req.params.id)
        const dto: UpdateTransactionDTO = new UpdateTransactionDTO(req.body.event, req.body.username)

        const transactions = await historyService.updateTransaction(id, dto)
        const payload: Payload = new Payload(`Transactions ${id} successfully updated`, transactions)

        res.status(200).json(payload)
    } catch (e) {
        next(e)
    }
}

export default {
    createTransaction,
    findTransactions,
    findTransactionById,
    updateTransaction,
}