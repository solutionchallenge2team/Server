import { CustomRepository } from "src/db/typeorm-ex.decorator";
import { Repository } from "typeorm";
import { Community } from "./community.entity";
import { CreateCommunityDto } from "src/auth/dto/create-community-dto";
import { Injectable } from "@nestjs/common";

@CustomRepository(Community)
export class CommunityRepository extends Repository<Community> {
    async createCommunity(createCommunityDto: CreateCommunityDto): Promise<Community>{
        const { communityName, postsExposurePeriod } = createCommunityDto;

        const community = this.create({
            communityName,
            postsExposurePeriod,
        });

        await this.save(community);
        return community;
    }
}