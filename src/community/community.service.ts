import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateCommunityDto } from 'src/auth/dto/create-community-dto';
import { Community } from './community.entity';
import { CommunityRepository } from './community.repository';
import { User } from 'src/user/user.entity';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class CommunityService {
    constructor(
        private communityRepository: CommunityRepository,
        private userRepository: UserRepository,
    ) {}

    private logger = new Logger('CommunityService');

    async getAllCommunity(): Promise<Community[]> {
        return this.communityRepository.find();
    }

    async createCommunity(createCommunityDto: CreateCommunityDto): Promise<Community>{
        const community =  await this.communityRepository.createCommunity(createCommunityDto);
        this.logger.verbose(`created community: ${JSON.stringify(community)}`);
        return community;
    }

    async getCommunityById(communityId: number): Promise<Community> {
        const found = await this.communityRepository.findOne({where: {communityId}});

        if(!found) {
            throw new NotFoundException(`Can't find Community with Id ${communityId}`);
        }
        return found;
    }

    async findCommunity(communityName: string): Promise<Community>{
        const found = await this.communityRepository.findOne({where: {communityName}});
        if(!found){
            throw new NotFoundException(`Can't find Community with communityName ${communityName}`);
        }

        return found;
    }

    //user 정보에 community 저장
    async addCommunity(community: Community, user: User): Promise<Community>{
        this.logger.verbose(`${JSON.stringify(community)} got into community.
        ${JSON.stringify(user)} got into user`);
        user.community = community;
        await this.userRepository.save(user);
        return community;
    }

    async existCommunity(user: User): Promise<boolean> {
        if(await user.community){
            return true;
        } else {
            return false;
        }
    }

}
