import { IsNotEmpty } from "class-validator";

export class CreateCommunityDto {
    @IsNotEmpty()
    communityId: number;

    @IsNotEmpty()
    communityName: string;
}