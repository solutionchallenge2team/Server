import { Body, Controller, Get, Delete, Param, ParseIntPipe, Post, Patch } from "@nestjs/common";
import { BoardsService } from "./board.service";
import { Board } from "./board.entity";
import { CreateBoardDto } from "../auth/dto/create-board-dto";

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

    @Patch('/:boardId/newReply')
    createBoardReply(
        @Param('boardId') boardId,
        @Body('newReply') newReply: string,
    ){
        return this.boardsService.createBoardReply(boardId, newReply);
    }
}