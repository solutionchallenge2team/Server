import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { BoardRepository } from 'src/boards/board.repository';
import { TypeOrmExModule } from 'src/db/typeorm-ex.module';
import { AuthGuard, PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { CommunityRepository } from 'src/community/community.repository';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([UserRepository, BoardRepository, CommunityRepository]),
    PassportModule.register({defaultStrategy: 'jwt'}),
  ],
  providers: [UserService, JwtStrategy],
  controllers: [UserController]
})
export class UserModule {}
