import { Body, Controller, Get, Logger, Param, Post, UseGuards } from '@nestjs/common';
import { CreateCommunityDto } from 'src/auth/dto/create-community-dto';
import { Community } from './community.entity';
import { CommunityService } from "./community.service";
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/user/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('community')
export class CommunityController {
    constructor(private communityService: CommunityService){}
    private logger = new Logger('CommunityController');

    @Get()
    getAllCommunity(): Promise<Community[]> {
        return this.communityService.getAllCommunity();
    }


    //커뮤니티 생성하고 그 커뮤니티를 유저 정보에 저장
    @Post()
    @UseGuards(AuthGuard())   //실험 성공!!
    async createCommunity(
        @Body() createCommunityDto: CreateCommunityDto,
        @GetUser() user: User,
    ): Promise<Community> {
        this.logger.verbose(`${JSON.stringify(createCommunityDto)} got into createCommunity`);

        const found = await this.communityService.createCommunity(createCommunityDto);
        this.logger.verbose(`${JSON.stringify(found)} got in to community`);
        this.communityService.addCommunity(found, user);
        return found;
    }


    @Get('/:communityId')
    getCommunityById(@Param('communityId') communityId: number): Promise<Community> {
        return this.communityService.getCommunityById(communityId);
    }

    //이름으로 커뮤니티 찾고 그 커뮤니티를 유저 정보에 저장하기
    @Get('find/:communityName')
    @UseGuards(AuthGuard())   //실험 성공!!
    async findCommunity(
        @Param('communityName') communityName: string,
        @GetUser() user: User   //user 정보 같이 불러와야 함.
    ){
        const community = await this.communityService.findCommunity(communityName);
        await this.communityService.addCommunity(community, user);
        return community;
    }

    //커뮤니티가 있는지 검사
    @Get('/whether/it/exists')
    @UseGuards(AuthGuard())
    async existCommunity(
        @GetUser() user: User,
    ): Promise<boolean> {
        return await this.communityService.existCommunity(user);
    }
    
}
