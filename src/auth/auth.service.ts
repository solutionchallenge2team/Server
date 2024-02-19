import { Injectable, Logger, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/user/user.repository';
import { CreateUserDto } from './dto/create-user-dto';
import { User } from '../user/user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import {CommunityRepository} from 'src/community/community.repository';
import {Community} from 'src/community/community.entity'

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
        private communityRepository: CommunityRepository
    ) {}
    private logger = new Logger('AuthService');


    //회원가입
    async signUp(createuserDto: CreateUserDto): Promise<User> {
        this.logger.verbose('signing up in service');
        const found = await this.findCommunity(createuserDto.communityName);
        return this.userRepository.createUser(createuserDto, found);
    }

    // //커뮤니티 찾아서 유저 정보에 저장
    async findCommunity(communityName: string): Promise<Community>{
        const found = await this.communityRepository.findOne({where: {communityName}});
        if(!found){
            throw new NotFoundException(`Can't find Community with communityName ${communityName}`);
        }
        return found;
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
