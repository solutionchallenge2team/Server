import { CustomRepository } from "src/db/typeorm-ex.decorator";
import { Repository } from "typeorm";
import { Community } from "./community.entity";
import { CreateCommunityDto } from "src/auth/dto/create-community-dto";

@CustomRepository(Community)
export class CommunityRepository extends Repository<Community> {
    async createCommunity(createCommunityDto: CreateCommunityDto): Promise<Community>{
        const { communityId, communityName } = createCommunityDto;

        const community = this.create({
            communityId,
            communityName,
        });

        await this.save(community);
        return community;
    }
}