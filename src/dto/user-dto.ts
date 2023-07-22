import { UserModel } from "../models/user-model"

class UserAuthDTO {
    name: string
    password: string

    constructor(name: string, password: string) {
        this.name = name
        this.password = password
    }

    mapToModel(): UserModel { return new UserModel(this.name, this.password) }
}

export {
    UserAuthDTO
}