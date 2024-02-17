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
    async getBoardByID(id: number): Promise<Board> {
        const found = await this.boardRepository.findOne({where:{id}});

        if(!found) {
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }
        return found;
    }
    
    //게시물 생성하기, userid는 입력이 아니라 자동으로 가져와야 한다. 
    createBoard(createBoardDto: CreateBoardDto): Promise<Board>{
        return this.boardRepository.createBoard(createBoardDto);
    }

    //게시물 삭제하기
    async deleteBoard(id: number): Promise<void>{
        //삭제 권한 추가해야함
        const result = await this.boardRepository.delete(id);

        if(result.affected===0) {
            throw new NotFoundException(`Can't find board with id ${id}`);
        }
    }

    //게시물 title, description 바꾸기
    async updateBoard(id: number, newtitle: string, newcontent: string, newlocation: string): Promise<Board>{
        const board = await this.getBoardByID(id);

        board.title = newtitle;
        board.content = newcontent;
        board.location = newlocation;
        await this.boardRepository.save(board);

        return board;
    }
    
}