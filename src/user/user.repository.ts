
import { CustomRepository } from "src/db/typeorm-ex.decorator";
import { User } from "../user/user.entity";
import { EntityManager, EntityMetadata, Repository } from "typeorm";
import { CreateUserDto } from "src/auth/dto/create-user-dto";
import * as bcrypt from 'bcryptjs';
import { Logger } from "@nestjs/common";
import { CommunityRepository } from "src/community/community.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { privateDecrypt } from "crypto";
import { CommunityService } from "src/community/community.service";
import { Community } from "src/community/community.entity";

@CustomRepository(User)
export class UserRepository extends Repository<User>{
    private logger = new Logger('UserRepository');

    async createUser(createUserDto: CreateUserDto): Promise<User>{
        this.logger.verbose(`${JSON.stringify(createUserDto)} got in to repository`);
 
        const { nickname, email, password, userLevel} = createUserDto;

        // this.logger.verbose(`${found} is found`);

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = this.create({
            nickname,
            email,
            password: hashedPassword,
            userLevel,
        });

        this.logger.verbose(`${user.nickname} user is created`);

        await this.save(user);
        return user;
    }
}
