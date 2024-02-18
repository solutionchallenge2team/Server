import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserRepository } from './user.repository';
import { TypeOrmExModule } from 'src/db/typeorm-ex.module';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([UserRepository])
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
