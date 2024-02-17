import { Injectable, NotFoundException } from "@nestjs/common";
import { Board } from "./board.entity";
import { BoardRepository } from "./board.repository";
import { CreateBoardDto } from "../auth/dto/create-board-dto";

@Injectable()
export class BoardsService {
    constructor(
        private boardRepository: BoardRepository,
    ) {}

    async getAllBoards(): Promise<Board[]> {
        return this.boardRepository.find();
    }
    
    //id를 이용해서 게시물 가져오기
    async getBoardById(boardId: number): Promise<Board> {
        const found = await this.boardRepository.findOne({where:{boardId}});

        if(!found) {
            throw new NotFoundException(`Can't find Board with boardId ${boardId}`);
        }
        return found;
    }
    
    //게시물 생성하기, userid는 입력이 아니라 자동으로 가져와야 한다. 
    createBoard(createBoardDto: CreateBoardDto): Promise<Board>{
        return this.boardRepository.createBoard(createBoardDto);
    }

    //게시물 삭제하기
    async deleteBoard(boardId: number): Promise<void>{
        //삭제 권한 추가해야함
        const result = await this.boardRepository.delete(boardId);

        if(result.affected===0) {
            throw new NotFoundException(`Can't find board with boardId ${boardId}`);
        }
    }

    //게시물 title, description 바꾸기
    async updateBoard(boardId: number, newtitle: string, newcontent: string, newlocation: string): Promise<Board>{
        const board = await this.getBoardById(boardId);

        //new 가 "" 이면 기존 값이 유지되도록 바꿔야 함
        board.title = newtitle;
        board.content = newcontent;
        board.location = newlocation;
        await this.boardRepository.save(board);

        return board;
    }

    //boarId로 Board가져오고 replys배열에 newreply 추가
    async createBoardReply(boardId: number, newReply: string): Promise<Board>{
        const board = await this.getBoardById(boardId);

        board.replys = newReply;
        await this.boardRepository.save(board);

        return board;
    }
    
}