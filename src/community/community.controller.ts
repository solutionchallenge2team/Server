import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateCommunityDto } from 'src/auth/dto/create-community-dto';
import { Community } from './community.entity';
import { CommunityService } from "./community.service";
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/user/user.entity';

@Controller('community')
export class CommunityController {
    constructor(private communityService: CommunityService){}

    @Get()
    getAllCommunity(): Promise<Community[]> {
        return this.communityService.getAllCommunity();
    }

    //커뮤니티 생성하고 그 커뮤니티를 유저 정보에 저장
    @Post()
    async createCommunity(
        @Body() createCommunityDto: CreateCommunityDto,
        @GetUser() user: User,
    ): Promise<Community> {
        const community = await this.communityService.createCommunity(createCommunityDto);
        this.communityService.addCommunity(community, user);
        return community;
    }

    @Get('/:communityId')
    getCommunityById(@Param('communityId') communityId: number): Promise<Community> {
        return this.communityService.getCommunityById(communityId);
    }

    //이름으로 커뮤니티 찾고 그 커뮤니티를 유저 정보에 저장하기
    @Get('find/:communityName')
    async findCommunity(
        @Param('communityName') communityName: string,
        @GetUser() user: User   //user 정보 같이 불러와야 함.
    ){
        const community = await this.communityService.findCommunity(communityName);
        await this.communityService.addCommunity(community, user);
        return community;
    }
}
