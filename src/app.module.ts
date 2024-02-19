import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeORMConfig } from "./configs/typeorm.config";
import { BoardsModule } from "./boards/boards.module";
import { MypageModule } from './mypage/mypage.module';
import { CommunityModule } from './community/community.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(typeORMConfig),
        BoardsModule,
        MypageModule,
        CommunityModule,
        AuthModule,
    ],
})
export class AppModule {}