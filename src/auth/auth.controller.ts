import { Body, Controller, Logger, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user-dto';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
    private logger = new Logger('AuthController'); 
    constructor(private authService: AuthService){}

    @Post('/signup')
    signUp(@Body() createUserDto: CreateUserDto) : Promise<User>{
        this.logger.verbose(`signing up in controller`);
        return this.authService.signUp(createUserDto);
    }
}