import { CustomRepository } from "src/db/typeorm-ex.decorator";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "src/auth/dto/create-user-dto";
import * as bcrypt from 'bcryptjs';

@CustomRepository(User)
export class UserRepository extends Repository<User>{
    async createUser(createUserDto: CreateUserDto): Promise<User>{

        const { nickname, email, password, userLevel, community} = createUserDto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = this.create({
            nickname,
            email,
            password: hashedPassword,
            userLevel,
            community
        });
        await this.save(user);
        return user;
    }
}