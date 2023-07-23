import { prisma } from '../utils/database'
import { UserModel } from '../models/user-model'

const findUserByName = async (name: string) => {
    return prisma.user.findFirst({ where: { name: name } })
}

const createNewUser = async (user: UserModel) => {
    return prisma.user.create({ data: user })
}

export default {
    findUserByName,
    createNewUser
}