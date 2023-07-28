import { prisma } from '../utils/database';
import { TransactionDTO } from '../dto/transaction-dto';
import transactionRepository from '../repositories/transaction-repository';
import inventoryRepository from '../repositories/inventory-repository';
import productRepository from '../repositories/product-repository';
import { Event, PrismaClient } from '@prisma/client';

const createTransaction = async (dto: TransactionDTO) => {
    return await prisma.$transaction(async (tx) => {
        const inventories = await inventoryRepository.updateInventoryStock(tx as PrismaClient, dto.history)
        await productRepository.updateManyProductStock(tx as PrismaClient, dto.history)
        const transaction = await transactionRepository.createTransaction(tx as PrismaClient, dto)

        return { transaction, inventories }
    })
}

const readAllTransactions = async () => {
    return await transactionRepository.findAllTransactions()
}

const findTransactionsByEvent = async (event: Event) => {
    return await transactionRepository.findTransactionsByEvent(event)
}

const findTransactionsByUser = async (username: string) => {
    return await transactionRepository.findTransactionsByUser(username)
}

const findTransactionById = async (id: number) => {
    return await transactionRepository.findTransactionById(id)
}

export default {
    createTransaction,
    readAllTransactions,
    findTransactionsByEvent,
    findTransactionsByUser,
    findTransactionById,
}