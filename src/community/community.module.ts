import { Module } from '@nestjs/common';
import { CommunityController } from './community.controller';
import { CommunityService } from './community.service';
import { TypeOrmExModule } from 'src/db/typeorm-ex.module';
import { CommunityRepository } from './community.repository';
import { UserRepository } from 'src/user/user.repository';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([CommunityRepository, UserRepository]),
],controllers: [CommunityController],
  providers: [CommunityService],

})
export class CommunityModule {}
