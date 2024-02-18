import { Body, Controller, Logger, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user-dto';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    //회원가입
    @Post('/signup')
    signUp(@Body() createUserDto: CreateUserDto) : Promise<User>{
        return this.authService.signUp(createUserDto);
    }

    //로그인
    @Post('/signin')
    signIn(@Body() createUserDto: CreateUserDto) {
        return this.authService.signIn(createUserDto);
    }
}