import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateCommunityDto } from 'src/auth/dto/create-community-dto';
import { Community } from './community.entity';
import { CommunityService } from "./community.service";

@Controller('community')
export class CommunityController {
    constructor(private communityService: CommunityService){}

    @Get()
    getAllCommunity(): Promise<Community[]> {
        return this.communityService.getAllCommunitiy();
    }

    @Post()
    createCommunity(@Body() createCommunityDto: CreateCommunityDto): Promise<Community> {
        return this.communityService.createCommunity(createCommunityDto);
    }

}
