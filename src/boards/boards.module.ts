import { Module } from "@nestjs/common";
import { TypeOrmExModule } from "src/db/typeorm-ex.module";
import { BoardRepository } from "./board.repository";
import { BoardsService } from "./board.service";
import { BoardsController } from "./board.controller";
import { ReplyRepository } from "src/reply/reply.repository";

@Module({
    imports: [
        TypeOrmExModule.forCustomRepository([BoardRepository, ReplyRepository]),
    ],
    controllers: [BoardsController],
    providers: [BoardsService]
})
export class BoardsModule{}