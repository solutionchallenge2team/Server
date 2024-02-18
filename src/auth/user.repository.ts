import { CustomRepository } from "src/db/typeorm-ex.decorator";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "src/auth/dto/create-user-dto";
import { Logger } from "@nestjs/common";

@CustomRepository(User)
export class UserRepository extends Repository<User>{

    async createUser(createUserDto: CreateUserDto): Promise<User>{

        const { nickname, email, password, userLevel, community} = createUserDto;
        
        const user = this.create({
            nickname,
            email,
            password,
            userLevel,
            community
        });
        await this.save(user);
        return user;
    }
}