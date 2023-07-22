import { ResponseError } from '../dto/response-error'
import { UserAuthDTO } from '../dto/user-dto';
import userRepository from '../repositories/user-repository';

const register = async (dto: UserAuthDTO) => {
    const isUser = await userRepository.findUserByName(dto.name)
    if (isUser) {
        throw new ResponseError(409, 'Username is already in use')
    }

    return await userRepository.register(dto.mapToModel())
}

export default {
    register
}