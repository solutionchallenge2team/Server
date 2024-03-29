import { Injectable, Logger, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/user/user.repository';
import { CreateUserDto } from './dto/create-user-dto';
import { User } from '../user/user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import {CommunityRepository} from 'src/community/community.repository';
import {Community} from 'src/community/community.entity'
import { CommunityService } from 'src/community/community.service';
import { CommunityController } from 'src/community/community.controller';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
        private communityRepository: CommunityRepository,
    ) {}
    private logger = new Logger('AuthService');


    //회원가입
    async signUp(createuserDto: CreateUserDto): Promise<User> {
        this.logger.verbose('signing up in service');
        const user = await this.userRepository.createUser(createuserDto);

        return user;
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

    async getAllUser(): Promise<User[]> {
        return this.userRepository.find();
    }

}
