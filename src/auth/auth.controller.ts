import { Body, Controller, Logger, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user-dto';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}
    private logger = new Logger('AuthController');

    //회원가입
    @Post('/signup')
    signUp(@Body() createUserDto: CreateUserDto) : Promise<User>{
        this.logger.verbose('signing up in controller');
        return this.authService.signUp(createUserDto);
    }

    //로그인
    @Post('/signin')
    signIn(@Body() createUserDto: CreateUserDto): Promise<{accessToken: string}> { //여기에 createUser가 왜 있지????? 
        return this.authService.signIn(createUserDto);
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    test(@GetUser() user: User){
        console.log('user', user);
    }
}