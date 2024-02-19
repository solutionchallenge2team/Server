import { InjectRepository } from "@nestjs/typeorm";
import { IsNotEmpty } from "class-validator";
import { Community } from "src/community/community.entity";
import { CommunityRepository } from "src/community/community.repository";
import { UserLevel } from "src/user/userlevel.enum";

export class CreateUserDto {
    constructor(
        private communityRepository: CommunityRepository
    ){}

    @IsNotEmpty() 
    nickname: string;    //닉네임

    @IsNotEmpty()        
    email: string;   //이메일

    @IsNotEmpty()        
    password: string;   //암호

    @IsNotEmpty()        
    userLevel: UserLevel;   //MEMBER OR MANAGER

    @IsNotEmpty()
    communityName: string;   //속한 공동체
}