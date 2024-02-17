import { Module } from '@nestjs/common';
import { CommunityController } from './community.controller';
import { CommunityService } from './community.service';
import { TypeOrmExModule } from 'src/db/typeorm-ex.module';
import { CommunityRepository } from './community.repository';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([CommunityRepository]),
],controllers: [CommunityController],
  providers: [CommunityService],

})
export class CommunityModule {}
