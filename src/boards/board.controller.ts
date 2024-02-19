import { Body, Controller, Get, Delete, Param, ParseIntPipe, Post, Patch, UseGuards } from "@nestjs/common";
import { BoardsService } from "./board.service";
import { Board } from "./board.entity";
import { CreateBoardDto } from "../auth/dto/create-board-dto";
import { Reply } from "src/reply/reply.entity";
import { CreateReplyDto } from "src/auth/dto/create-reply-dto";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "src/auth/get-user.decorator";
import { User } from "src/auth/user.entity";

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
    constructor(private boardsService: BoardsService){}

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
    deleteBoard(@Param('boardId', ParseIntPipe) id): Promise<void> {
        return this.boardsService.deleteBoard(id);
    }

    //게시물 title, description 바꾸기
    @Patch('/:boardId')
    updateBoard(
        @Param('boardId', ParseIntPipe) boardId,
        @Body('newtitle') newtitle: string, 
        @Body('newcontent') newcontent:string,
        @Body('newlocation') newlocation:string
    ): Promise<Board>{
        return this.boardsService.updateBoard(boardId, newtitle, newcontent, newlocation);
    }

    //boarId로 Board가져오고, replyRepository에서 newReply 생성해서, Board의 replies 배열에 newReply 추가
    @Patch('/:boardId/newReply')
    async addBoardReply(
        @Param('boardId', ParseIntPipe) boardId: number,
        @Body() createReplyDto: CreateReplyDto
    ){
        return this.boardsService.addBoardReply(boardId, createReplyDto);
    }

    @Patch('/:boardId/increaseHearts')
    increaseHearts(
        @Param('boardId') boardId,
    ){
        return this.boardsService.increaseHearts(boardId);
    }

    @Patch('/:boardId/decreaseHearts')
    decreaseHearts(
        @Param('boardId') boardId,
    ){
        return this.boardsService.decreaseHearts(boardId);
    }


    @Get('/top10')
    getTop10Boards(){
        return this.boardsService.getTop10Boards();
    }
}