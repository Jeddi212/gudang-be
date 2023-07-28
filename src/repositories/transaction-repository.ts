import { prisma } from '../utils/database'
import { TransactionDTO } from '../dto/transaction-dto'
import { ResponseError } from '../dto/response-error'

const createTransaction = async (tx: any, transaction: TransactionDTO) => {
    try {
        return await tx.transaction.create({
            data: {
                event: transaction.event,
                username: transaction.username,
                Inventory: {
                    create: transaction.inventory.map((i) => {
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
        throw new ResponseError(500, 'Error during transaction create transaction', error);
    }
};

export default {
    createTransaction,
}