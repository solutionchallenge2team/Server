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



    async signUp(createuserDto: CreateUserDto): Promise<User> {
        return this.userRepository.createUser(createuserDto);
    }
}
