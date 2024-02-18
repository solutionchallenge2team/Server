import { Body, Controller, Get, Delete, Param, ParseIntPipe, Post, Patch } from "@nestjs/common";
import { BoardsService } from "./board.service";
import { Board } from "./board.entity";
import { CreateBoardDto } from "../auth/dto/create-board-dto";
import { Reply } from "src/reply/reply.entity";
import { CreateReplyDto } from "src/auth/dto/cretae-reply-dto";

@Controller('boards')
export class BoardsController {
    constructor(private boardsService: BoardsService){}

    @Get()
    getAllBoards(): Promise<Board[]> {
        return this.boardsService.getAllBoards();
    }

    @Get('/:boardId')
    getBoardById(@Param('boardId') boardId: number): Promise<Board>{
        return this.boardsService.getBoardById(boardId);
    }

    @Post()
    createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
        return this.boardsService.createBoard(createBoardDto);
    }

    @Delete('/:boardId')
    deleteBoard(@Param('boardId', ParseIntPipe) id): Promise<void> {
        return this.boardsService.deleteBoard(id);
    }

    @Patch('/:boardId')
    updateBoard(
        @Param('boardId', ParseIntPipe) boardId,
        @Body('newtitle') newtitle: string, 
        @Body('newcontent') newcontent:string,
        @Body('newlocation') newlocation:string
    ){
        return this.boardsService.updateBoard(boardId, newtitle, newcontent, newlocation);
    }

    // @Patch('/:boardId/newReply')
    // async addBoardReply(
    //     @Param('boardId', ParseIntPipe) boardId: number,
    //     @Body() createReplyDto: CreateReplyDto
    // ){
    //     return this.boardsService.addBoardReply(boardId, createReplyDto);
    // }

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


    //URL을 /:top10 으로 쓰면 위에 있는 @Get('/:boardId') 랑 구분 못한다
    //이렇게 써도 되려나?
    @Get('/:top/10')
    getTop10Boards(){
        return this.boardsService.getTop10Boards();
    }
}