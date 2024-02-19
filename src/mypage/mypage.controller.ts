import { Body, Controller, Get, Param, Patch, Post, UseGuards, } from '@nestjs/common';
import { MypageService } from './mypage.service';
import { Board } from 'src/boards/board.entity';
import { CreateUserDto } from 'src/auth/dto/create-user-dto';
import { User } from 'src/auth/user.entity';
import { CreateBoardDto } from 'src/auth/dto/create-board-dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('mypage')
@UseGuards(AuthGuard())
export class MypageController {
    constructor(private mypageService: MypageService){}

    // //userid로 유저 정보 가져오기
    // @Get('/:userid')
    // async getUserByUserID(@Param('userid') userid: number): Promise<User> {
    //     const found = await this.mypageService.getUserByUserID(userid);
    
    //     return found;
    // }

    //로그인 된 상태에서 자동으로 유저 정보 가져오기
    @Get()
    async getUserProfile(
        @GetUser() user: User
    ): Promise<User> {
        const found = await this.mypageService.getUserProfile(user);
        return found;
    }

    // //userid로 유저가 작성한 글 가져오기
    // @Get('/:userid/boards')
    // async getBoardsbyUserId(@Param('userid') userid: number): Promise<Board[]> {
    //     const found =  await this.mypageService.getBoardsbyUserID(userid);

    //     return found;
    // }

    //로그인 된 상태에서 유저가 작성한 글 가져오기
    @Get('/boards')
    async getBoardsbyUser(
        @GetUser() user: User
    ): Promise<Board[]>{
        const found = await this.mypageService.getBoardsbyUser(user);
        return found;
    }

    // //닉네임 수정
    // @Patch('/:userid')
    // updateUserNickname(@Param('userid') userid: number, @Body('nickname') nickname: string): Promise<User>{
    //     return this.mypageService.updateUserNickname(userid, nickname);
    // }

    //로그인 된 상태에서 닉네임 수정
    @Patch()
    updateUserNickname(
        @GetUser() user: User,
        @Body('nickname') nickname: string
    ):Promise<User> {
        return this.mypageService.updateUserNickname(user, nickname);
    }
}
