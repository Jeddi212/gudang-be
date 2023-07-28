import { prisma } from '../utils/database';
import { TransactionDTO } from '../dto/transaction-dto';
import historyRepository from '../repositories/transaction-repository';
import inventoryRepository from '../repositories/inventory-repository';
import productRepository from '../repositories/product-repository';
import { PrismaClient } from '@prisma/client';

const createTransaction = async (dto: TransactionDTO) => {
    return await prisma.$transaction(async (tx) => {
        const inventories = await inventoryRepository.updateInventoryStock(tx as PrismaClient, dto.history)
        await productRepository.updateManyProductStock(tx as PrismaClient, dto.history)
        const transaction = await historyRepository.createTransaction(tx as PrismaClient, dto)

        return { transaction, inventories }
    })
}

export default {
    createTransaction
}