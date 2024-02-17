import { CustomRepository } from "src/db/typeorm-ex.decorator";
import { Repository } from "typeorm";
import { Board } from "./board.entity";
import { CreateBoardDto } from "../auth/dto/create-board-dto";
import { v1 as uuid } from "uuid";
import { BoardStatus } from "./board-status.enum";
import { Injectable } from "@nestjs/common";

@CustomRepository(Board)
export class BoardRepository extends Repository<Board> {
    async createBoard(createBoardDto: CreateBoardDto): Promise<Board>{
        const { title, content, location, userid, } = createBoardDto;

        const board = this.create({
            title,
            content,
            location,
            hearts:0,
            status:BoardStatus.VALID,
            userid,
            replys:"",
        });

        await this.save(board);
        return board;
    }
}

