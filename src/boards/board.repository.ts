import { CustomRepository } from "src/db/typeorm-ex.decorator";
import { Repository } from "typeorm";
import { Board } from "./board.entity";
import { CreateBoardDto } from "../auth/dto/create-board-dto";
import { v1 as uuid } from "uuid";
import { BoardStatus } from "./board-status.enum";
import { userInfo } from "os";
import { User } from "src/auth/user.entity";

@CustomRepository(Board)
export class BoardRepository extends Repository<Board> {
    
    async createBoard(createBoardDto: CreateBoardDto): Promise<Board>{
        const { title, content, location} = createBoardDto;

        const board = this.create({
            title,
            content,
            location,
            hearts:0,
            status:BoardStatus.VALID,
            replys: [],
        });

        await this.save(board);
        return board;
    }
}

