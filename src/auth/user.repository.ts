import { CustomRepository } from "src/db/typeorm-ex.decorator";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "src/auth/dto/create-user-dto";
import { Logger } from "@nestjs/common";

@CustomRepository(User)
export class UserRepository extends Repository<User>{
    private logger = new Logger('UserRepository'); 

    async createUser(createUserDto: CreateUserDto): Promise<User>{
        this.logger.verbose(`this is createUserDto: ${createUserDto}`);

        const { nickname, email, password, userLevel, community} = createUserDto;
        this.logger.verbose(`created`);
        
        const user = this.create({
            nickname,
            email,
            password,
            userLevel,
            community
        });
        this.logger.verbose(`made user ${user}`);
        await this.save(user);
        return user;
    }
}