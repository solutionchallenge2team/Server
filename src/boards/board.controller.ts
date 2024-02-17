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

    @Get('/:id')
    getBoardById(@Param('id') id: number): Promise<Board>{
        return this.boardsService.getBoardById(id);
    }

    @Post()
    createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
        return this.boardsService.createBoard(createBoardDto);
    }

    @Delete('/:id')
    deleteBoard(@Param('id', ParseIntPipe) id): Promise<void> {
        return this.boardsService.deleteBoard(id);
    }

    @Patch('/:id')
    updateBoard(
        @Param('id', ParseIntPipe) id,
        @Body('newtitle') newtitle: string, 
        @Body('newcontent') newcontent:string,
        @Body('newlocation') newlocation:string
    ){
        return this.boardsService.updateBoard(id, newtitle, newcontent, newlocation);
    }
}