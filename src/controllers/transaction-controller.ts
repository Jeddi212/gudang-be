import { Payload } from '../dto/payload'
import { Request, Response, NextFunction } from 'express'
import { TransactionDTO } from '../dto/transaction-dto'
import { HistoryDTO } from '../dto/history-dto'
import historyService from '../services/transaction-service'
import validation from '../utils/validation'
import { Event } from '@prisma/client'
import { ResponseError } from '../dto/response-error'

enum SearchType {
    EVENT = 'event',
    USER = 'user',
}

const createTransaction = async (req: Request, res: Response, next: NextFunction) => {
    try {
        validation.validateCreateHistory(req)

        const inventory = req.body.inventory ?? [];
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

const readAllTransactions = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const transactions = await historyService.readAllTransactions()
        const payload: Payload = new Payload(`Transactions successfully fetched`, transactions)

        res.status(200).json(payload)
    } catch (e) {
        next(e)
    }
}

const searchTransaction = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const search = req.query.search as SearchType;
        let searchValue = ''

        switch (search) {
            case SearchType.EVENT:
                searchValue = req.query.event as Event || ''
                break
            case SearchType.USER:
                searchValue = req.query.username as string || ''
                break
            default:
                throw new ResponseError(404, 'Invalid search type', search)
        }

        const transactions =
            search === SearchType.EVENT
                ? await historyService.findTransactionsByEvent(searchValue as Event)
                : await historyService.findTransactionsByUser(searchValue)

        const payload: Payload = new Payload(`Transactions successfully fetched`, transactions)

        res.status(200).json(payload)
    } catch (e) {
        next(e)
    }
}

const findTransactionById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await validation.validateTransactionId(req)
        const username = parseInt(req.params.id)

        const transactions = await historyService.findTransactionById(username)
        const payload: Payload = new Payload(`Transactions successfully fetched`, transactions)

        res.status(200).json(payload)
    } catch (e) {
        next(e)
    }
}

export default {
    createTransaction,
    readAllTransactions,
    searchTransaction,
    findTransactionById
}