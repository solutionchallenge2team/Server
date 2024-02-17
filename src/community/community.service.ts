import { Injectable } from '@nestjs/common';
import { CreateCommunityDto } from 'src/auth/dto/create-community-dto';
import { Community } from './community.entity';
import { CommunityRepository } from './community.repository';

@Injectable()
export class CommunityService {
    constructor(
        private communityRepository: CommunityRepository,
    ) {}

    createCommunity(createCommunityDto: CreateCommunityDto): Promise<Community>{
        return this.communityRepository.createCommunity(createCommunityDto);
    }

    async getAllCommunitiy(): Promise<Community[]> {
        return this.communityRepository.find();
    }

}
