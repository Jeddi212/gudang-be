import { prisma } from '../application/database'
import { UserModel } from '../models/user-model'

const findUserByName = async (name: string) => {
    return prisma.user.findFirst({ where: { name: name } })
}

const register = async (user: UserModel) => {
    return prisma.user.create({ data: user })
}

export default {
    findUserByName,
    register
}