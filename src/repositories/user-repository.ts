import { prisma } from '../utils/database'
import { User } from '../models/user'

const findUserByName = async (name: string) => {
    return prisma.user.findFirst({ where: { name: name } })
}

const createNewUser = async (user: User) => {
    return prisma.user.create({ data: user })
}

export default {
    findUserByName,
    createNewUser
}