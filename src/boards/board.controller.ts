import { Body, Controller, Get, Delete, Param, ParseIntPipe, Post, Patch, UseGuards, Logger } from "@nestjs/common";
import { BoardsService } from "./board.service";
import { Board } from "./board.entity";
import { CreateBoardDto } from "../auth/dto/create-board-dto";
import { CreateReplyDto } from "src/auth/dto/create-reply-dto";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "src/auth/get-user.decorator";
import { User } from "src/user/user.entity";

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
    constructor(private boardsService: BoardsService){}
    private logger = new Logger('boardsController');

    //VALID한 게시물 전부 가져오기(소속된 커뮤니티 내)
    @Get()
    getAllBoards(
        @GetUser() user: User
    ): Promise<Board[]> {
        return this.boardsService.getAllBoards(user);
    }

    //id를 이용해서 게시물 가져오기
    @Get('/:boardId')
    getBoardById(@Param('boardId') boardId: number): Promise<Board>{
        return this.boardsService.getBoardById(boardId);
    }


    //게시물 생성하기, user 정보 같이 넣어주기(user정보 있으니까 community 정보도 존재)
    @Post()
    createBoard(
        @Body() createBoardDto: CreateBoardDto,
        @GetUser() user: User
        ): Promise<Board> {
        return this.boardsService.createBoard(createBoardDto, user);
    }

    //게시물 삭제하기
    @Delete('/:boardId')
    deleteBoard(
        @Param('boardId', ParseIntPipe) boardId: number,
        @GetUser() user: User, //삭제 권한 추가
        ): Promise<void> {
        return this.boardsService.deleteBoard(boardId, user);
    }

    //게시물 title, description, location, photos 수정
    @Patch('/:boardId')
    updateBoard(
        @Param('boardId', ParseIntPipe) boardId,
        @Body('title') title: string, 
        @Body('content') content:string,
        @Body('location') location:string,
        @Body('photos') photos: string[],
        @GetUser() user: User,
    ): Promise<Board>{
        return this.boardsService.updateBoard(boardId, title, content, location, photos, user);
    }

    //boardId로 Board가져오고, replyRepository에서 newReply 생성해서, Board의 replies 배열에 newReply 추가
    @Post('/:boardId/newReply')
    async addBoardReply(
        @Param('boardId', ParseIntPipe) boardId: number,
        @Body() createReplyDto: CreateReplyDto
    ){
        return this.boardsService.addBoardReply(boardId, createReplyDto);
    }

    //댓글 수정 : replyId 불러와서 replyRepository에서 수정.
    @Patch('/:boardId/:replyId')
    async editReply(
        @Param('boardId') boardId: number,
        @Param('replyId') replyId: number,
        @Body('replyContent') replyContent: string,
    ){
        return this.boardsService.editReply(replyId, replyContent);
    }

    //댓글 삭제
    @Delete('/:boardId/:replyId')
    async deleteReply(
        @Param('boardId') boardId: number,
        @Param('replyId') replyId: number,
    ){
        return this.boardsService.deleteReply(replyId);
    }

    //하트 개수 증가
    @Post('/:boardId/increaseHearts')
    async increaseHearts(
        @Param('boardId') boardId: number,
    ){
        return this.boardsService.increaseHearts(boardId);
    }

    //하트 개수 감소
    @Post('/:boardId/decreaseHearts')
    decreaseHearts(
        @Param('boardId') boardId:number,
    ){
        return this.boardsService.decreaseHearts(boardId);
    }

    //top10(유저가 속한 커뮤니티 내)
    @Get('top/10')
    getTop10Boards(
        @GetUser() user: User,
    ){
        return this.boardsService.getTop10Boards(user);
    }
}