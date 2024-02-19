import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateCommunityDto {
    @IsNotEmpty()
    communityName: string;

    @IsNotEmpty()
    @IsNumber()
    postsExposurePeriod: number;
}