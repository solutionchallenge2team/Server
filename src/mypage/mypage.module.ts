import { Module } from '@nestjs/common';
import { MypageService } from './mypage.service';
import { MypageController } from './mypage.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../auth/user.repository';
import { BoardRepository } from 'src/boards/board.repository';
import { TypeOrmExModule } from 'src/db/typeorm-ex.module';
import { AuthGuard, PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([UserRepository, BoardRepository]),
    PassportModule.register({defaultStrategy: 'jwt'}),
  ],
  providers: [MypageService, JwtStrategy],
  controllers: [MypageController]
})
export class MypageModule {}
