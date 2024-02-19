import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateCommunityDto } from 'src/auth/dto/create-community-dto';
import { Community } from './community.entity';
import { CommunityService } from "./community.service";

@Controller('community')
export class CommunityController {
    constructor(private communityService: CommunityService){}

    @Get()
    getAllCommunity(): Promise<Community[]> {
        return this.communityService.getAllCommunity();
    }

    @Post()
    createCommunity(@Body() createCommunityDto: CreateCommunityDto): Promise<Community> {
        return this.communityService.createCommunity(createCommunityDto);
    }

    @Get('/:communityId')
    getCommunityById(@Param('communityId') communityId: number): Promise<Community> {
        return this.communityService.getCommunityById(communityId);
    }

    //이름으로 커뮤니티 찾고 그 커뮤니티를 유저 정보에 저장하기
    @Get('find/:communityName')
    findCommunity(
        @Param('communityName') communityName: string
    ){
        return this.communityService.findCommunity(communityName);
    }

}
