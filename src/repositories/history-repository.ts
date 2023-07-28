import { prisma } from '../utils/database'
// import { History } from '../models/history'
import { HistoryDTO } from '../dto/history-dto'
import { ResponseError } from '../dto/response-error'
import { Event } from '@prisma/client'

const createHistory = async (tx: any, history: HistoryDTO) => {
    try {
        return await tx.history.create({
            data: {
                event: history.event,
                username: history.username,
                Inventory: {
                    create: history.inventory.map((i) => {
                        return {
                            quantity: i.quantity,
                            productId: i.product,
                            warehouseId: i.warehouse,
                        };
                    }),
                },
            },
            include: { Inventory: true },
        });
    } catch (error) {
        await tx.$queryRaw`ROLLBACK;`;
        throw new ResponseError(500, 'Error during transaction create history', error);
    }
};

export default {
    createHistory,
}