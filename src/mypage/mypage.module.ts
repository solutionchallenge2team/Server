import { Module } from '@nestjs/common';
import { MypageService } from './mypage.service';
import { MypageController } from './mypage.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../auth/user.repository';
import { BoardRepository } from 'src/boards/board.repository';
import { TypeOrmExModule } from 'src/db/typeorm-ex.module';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([UserRepository, BoardRepository]),
  ],
  providers: [MypageService],
  controllers: [MypageController]
})
export class MypageModule {}
