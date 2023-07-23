import { JWTPayload } from '../dto/payload';
import { ResponseError } from '../dto/response-error'
import { UserAuthDTO } from '../dto/user-dto';
import userRepository from '../repositories/user-repository';
import { generateJWT } from '../utils/jwt';

const register = async (dto: UserAuthDTO) => {
    const isUser = await userRepository.findUserByName(dto.name)
    if (isUser) {
        throw new ResponseError(409, 'Username is already in use')
    }

    return await userRepository.register(dto.mapToModel())
}

const login = async (dto: UserAuthDTO) => {
    const isUser = await userRepository.findUserByName(dto.name)
    if (!isUser) {
        throw new ResponseError(404, `${dto.name} user not found`)
    }

    if ((isUser.password !== dto.password)) {
        throw new ResponseError(401, `Invalid credentials`)
    }

    return generateJWT(new JWTPayload(isUser.name, isUser.id, isUser.level))
}

export default {
    register,
    login
}