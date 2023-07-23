import { generateJWT } from '../utils/jwt';
import { ResponseError } from '../dto/response-error'
import { UserAuthDTO, UserDTO } from '../dto/user-dto';
import userRepository from '../repositories/user-repository';

const register = async (dto: UserAuthDTO) => {
    const isUser = await userRepository.findUserByName(dto.name)
    if (isUser) {
        throw new ResponseError(409, 'Username is already in use')
    }

    const user = await userRepository.createNewUser(dto.mapToModel())
    return new UserDTO(user.id, user.name, user.level)
}

const login = async (dto: UserAuthDTO) => {
    const isUser = await userRepository.findUserByName(dto.name)
    if (!isUser) {
        throw new ResponseError(404, `${dto.name} user not found`)
    }

    if ((isUser.password !== dto.password)) {
        throw new ResponseError(401, `Invalid credentials`)
    }

    return generateJWT(new UserDTO(isUser.id, isUser.name, isUser.level))
}

export default {
    register,
    login
}