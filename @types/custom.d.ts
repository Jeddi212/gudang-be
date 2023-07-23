import { UserDTO } from "../src/dto/user-dto";

// custom.d.ts
declare global {
    namespace Express {
        interface Request {
            payload?: UserDTO;
        }
    }
}