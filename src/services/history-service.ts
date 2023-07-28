import { HistoryDTO } from '../dto/history-dto';
import historyRepository from '../repositories/history-repository';
import productRepository from '../repositories/product-repository';
import { prisma } from '../utils/database';

const createHistory = async (dto: HistoryDTO) => {
    return await prisma.$transaction(async (tx) => {
        await productRepository.updateManyProductStock(tx, dto.inventory);
        return await historyRepository.createHistory(tx, dto);
    });
};


export default {
    createHistory
}