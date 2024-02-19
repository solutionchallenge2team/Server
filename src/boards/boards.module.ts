import { Module } from "@nestjs/common";
import { TypeOrmExModule } from "src/db/typeorm-ex.module";
import { BoardRepository } from "./board.repository";
import { BoardsService } from "./board.service";
import { BoardsController } from "./board.controller";
import { ReplyRepository } from "src/reply/reply.repository";
import { AuthModule } from "src/auth/auth.module";

@Module({
    imports: [
        TypeOrmExModule.forCustomRepository([BoardRepository, ReplyRepository]),
        AuthModule
    ],
    controllers: [BoardsController],
    providers: [BoardsService]
})
export class BoardsModule{}