import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/auth/user.repository';
import { CreateUserDto } from './dto/create-user-dto';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) {}
    private logger = new Logger('AuthService');

    //회원가입
    async signUp(createuserDto: CreateUserDto): Promise<User> {
        this.logger.verbose('signing up in service');
        return this.userRepository.createUser(createuserDto);
    }

    //로그인
    async signIn(createUserDto: CreateUserDto): Promise<{accessToken: string}> {
        const {nickname, password} = createUserDto;
        const user = await this.userRepository.findOne({where: {nickname}});

        if(user && (await bcrypt.compare(password, user.password))){
            const payload = {nickname};
            const accessToken = await this.jwtService.sign(payload);
            return {accessToken};
        } else {
            throw new UnauthorizedException('login failed');
        }
    }
}
