import { prisma } from '../utils/database';
import { TransactionDTO } from '../dto/transaction-dto';
import historyRepository from '../repositories/transaction-repository';
import inventoryRepository from '../repositories/inventory-repository';
import productRepository from '../repositories/product-repository';

const createTransaction = async (dto: TransactionDTO) => {
    return await prisma.$transaction(async (tx) => {
        const inventories = await inventoryRepository.updateInventoryStock(tx, dto.history)
        await productRepository.updateManyProductStock(tx, dto.history)
        const transaction = await historyRepository.createTransaction(tx, dto)

        return { transaction, inventories }
    })
}

export default {
    createTransaction
}