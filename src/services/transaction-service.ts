import { TransactionDTO } from '../dto/transaction-dto';
import historyRepository from '../repositories/transaction-repository';
import productRepository from '../repositories/product-repository';
import { prisma } from '../utils/database';

const createTransaction = async (dto: TransactionDTO) => {
    return await prisma.$transaction(async (tx) => {
        await productRepository.updateManyProductStock(tx, dto.inventory);
        return await historyRepository.createTransaction(tx, dto);
    });
};


export default {
    createTransaction
}