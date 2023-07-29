import { TransactionDTO } from '../dto/transaction-dto'
import { ResponseError } from '../dto/response-error'
import { PrismaClient } from '@prisma/client';
import { prisma } from '../utils/database';

const createTransaction = async (tx: PrismaClient, transaction: TransactionDTO) => {
    try {
        return await tx.transaction.create({
            data: {
                event: transaction.event,
                username: transaction.username,
                History: {
                    create: transaction.history.map((i) => {
                        return {
                            quantity: i.quantity,
                            productId: i.product,
                            warehouseId: i.warehouse,
                        };
                    }),
                },
            },
            include: { History: true },
        })
    } catch (error) {
        await tx.$queryRaw`ROLLBACK;`
        throw new ResponseError(500, 'Error during transaction create transaction', error)
    }
}

const findTransactions = async (whereCondition: any) => {
    return await prisma.transaction.findMany({ where: whereCondition })
}

const findTransactionById = async (id: number) => {
    return await prisma.transaction.findUnique({
        where: { id: id },
        include: { History: true },
    })
}

export default {
    createTransaction,
    findTransactions,
    findTransactionById,
}