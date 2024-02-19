import { Body, Controller, Get, Delete, Param, ParseIntPipe, Post, Patch, UseGuards, Logger } from "@nestjs/common";
import { BoardsService } from "./board.service";
import { Board } from "./board.entity";
import { CreateBoardDto } from "../auth/dto/create-board-dto";
import { Reply } from "src/reply/reply.entity";
import { CreateReplyDto } from "src/auth/dto/create-reply-dto";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "src/auth/get-user.decorator";
import { User } from "src/user/user.entity";
import { repl } from "@nestjs/core";

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
    constructor(private boardsService: BoardsService){}
    private logger = new Logger('boardsController');

    //VALID한 게시물 전부 가져오기
    @Get()
    getAllBoards(): Promise<Board[]> {
        return this.boardsService.getAllBoards();
    }

    //id를 이용해서 게시물 가져오기
    @Get('/:boardId')
    getBoardById(@Param('boardId') boardId: number): Promise<Board>{
        return this.boardsService.getBoardById(boardId);
    }


    //게시물 생성하기, user 정보 같이 넣어주기
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

    //게시물 title, description, location 수정
    @Patch('/:boardId')
    updateBoard(
        @Param('boardId', ParseIntPipe) boardId,
        @Body('newtitle') newtitle: string, 
        @Body('newcontent') newcontent:string,
        @Body('newlocation') newlocation:string,
        @GetUser() user: User,
    ): Promise<Board>{
        return this.boardsService.updateBoard(boardId, newtitle, newcontent, newlocation, user);
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

    //top10
    @Get('top/10')
    getTop10Boards(){
        return this.boardsService.getTop10Boards();
    }
}