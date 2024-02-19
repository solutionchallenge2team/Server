
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserRepository } from "./user.repository";
import { User } from "./user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){ //Strategy를 넣어준다.
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ){
        super({
            secretOrKey: 'Secret1234',       //토큰이 유효한지 체크할 때 쓰는 것. 토큰 생성할 때 썼던 키랑 같아야 함.
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        }) //-> 토큰이 유효한지 확인 됨
    }

    //payload애서 user 정보를 전부 가져옴.
    async validate(payload){  //인증이 되었으니 payload가 전달됨
        const {nickname} = payload;
        const user: User = await this.userRepository.findOne({where: {nickname}});
        if(!user){
            throw new UnauthorizedException();
        }
        return user;
    }
}