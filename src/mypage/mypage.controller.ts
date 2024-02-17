import { Body, Controller, Get, Param, Patch, Post, } from '@nestjs/common';
import { MypageService } from './mypage.service';
import { Board } from 'src/boards/board.entity';
import { CreateUserDto } from 'src/auth/dto/create-user-dto';
import { User } from 'src/auth/user.entity';
import { CreateBoardDto } from 'src/auth/dto/create-board-dto';

@Controller('mypage')
export class MypageController {
    constructor(private mypageService: MypageService){}

    //userid로 유저가 작성한 글 get
    @Get('/:userid/boards')
    async getMyBoards(@Param('userid') userid: number): Promise<Board[]> {
        const found =  await this.mypageService.getBoardsbyUserID(userid);

        return found;
    }

    //userid로 유저 정보 get
    @Get('/:userid')
    async getUserByID(@Param('userid') userid: number): Promise<User> {
        const found = await this.mypageService.getUserByUserID(userid);

        return found;
    }

    //유저 생성하기
    @Post()
    createUser(@Body() createuserDto: CreateUserDto): Promise<User> {
        return this.mypageService.createUser(createuserDto);
    }

    //보드 생성하기
    @Post()
    createUserBoard(@Body() CreateBoardDto: CreateBoardDto): Promise<Board>{
        return this.mypageService.createUserBoard(CreateBoardDto);
    }

    @Patch('/:userid')
    updateUserNickname(@Param('userid') userid: number, @Body('nickname') nickname: string): Promise<User>{
        return this.mypageService.updateUserNickname(userid, nickname);
    }
}
