import { Injectable, NotFoundException } from '@nestjs/common';
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

    async getCommunityById(communityId: number): Promise<Community> {
        const found = await this.communityRepository.findOne({where: {communityId}});

        if(!found) {
            throw new NotFoundException(`Can't find Community with Id ${communityId}`);
        }
        return found;
    }

}
