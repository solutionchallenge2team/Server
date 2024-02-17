import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/auth/user.repository';
import { CreateUserDto } from './dto/create-user-dto';
import { User } from './user.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ) {}

    private logger = new Logger('AuthService'); 


    async signUp(createuserDto: CreateUserDto): Promise<User> {
        this.logger.verbose(`signing up in service`);
        return this.userRepository.createUser(createuserDto);
    }
}
