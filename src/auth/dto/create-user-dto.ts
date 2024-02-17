import { IsNotEmpty } from "class-validator";
import { UserLevel } from "src/mypage/userlevel.enum";

export class CreateUserDto {
    @IsNotEmpty()
    nickname: string;    //닉네임

    @IsNotEmpty()        
    email: string;   //이메일

    @IsNotEmpty()        
    password: string;   //암호

    @IsNotEmpty()        
    userLevel: UserLevel;   //MEMBER OR MANAGER

    @IsNotEmpty()        
    community: string;   //속한 공동체

}