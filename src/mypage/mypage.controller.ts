import { Body, Controller, Get, Param, Post, } from '@nestjs/common';
import { MypageService } from './mypage.service';
import { Board } from 'src/boards/board.entity';
import { CreateUserDto } from 'src/auth/dto/create-user-dto';
import { User } from 'src/auth/user.entity';
import { CreateBoardDto } from 'src/auth/dto/create-board-dto';

@Controller('mypage')
export class MypageController {
    constructor(private mypageService: MypageService){}

    //userid로 유저가 작성한 글 불러오기
    @Get('/:userid')
    async getMyBoards(@Param('userid') userid: number): Promise<Board> {
        const found =  await this.mypageService.getBoardsbyUserId(userid);

        return found;
    }

    @Post()
    createUser(@Body() createuserDto: CreateUserDto): Promise<User> {
        return this.mypageService.createUser(createuserDto);
    }

    @Post()
    createUserBoard(@Body() CreateBoardDto: CreateBoardDto): Promise<Board>{
        return this.mypageService.createUserBoard(CreateBoardDto);
    }
}
