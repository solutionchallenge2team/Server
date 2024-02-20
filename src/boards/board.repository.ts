import { CustomRepository } from "src/db/typeorm-ex.decorator";
import { Repository } from "typeorm";
import { Board } from "./board.entity";
import { CreateBoardDto } from "../auth/dto/create-board-dto";
import { v1 as uuid } from "uuid";
import { BoardStatus } from "./board-status.enum";
import { userInfo } from "os";
import { User } from "src/user/user.entity";

@CustomRepository(Board)
export class BoardRepository extends Repository<Board> {
    
    async createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board>{
        const { title, content, location, photos} = createBoardDto;

        const board = this.create({
            title,
            content,
            location,
            photos,
            hearts:0,
            status:BoardStatus.VALID,
            user,
            replies: []
        });

        await this.save(board);
        return board;
    }
}

