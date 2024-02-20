import { Module } from '@nestjs/common';
import { CommunityController } from './community.controller';
import { CommunityService } from './community.service';
import { TypeOrmExModule } from 'src/db/typeorm-ex.module';
import { CommunityRepository } from './community.repository';
import { UserRepository } from 'src/user/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([CommunityRepository, UserRepository]),
    PassportModule.register({defaultStrategy: 'jwt'}),  //이녀석 주입해줌...!!
],controllers: [CommunityController],
  providers: [CommunityService, JwtStrategy],

})
export class CommunityModule {}
