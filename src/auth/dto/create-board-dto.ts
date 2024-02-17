import { IsNotEmpty } from "class-validator";

export class CreateBoardDto {
    @IsNotEmpty()
    title: string;      //제목

    @IsNotEmpty()
    content: string;    //설명

    @IsNotEmpty()        
    location: string;   //위치

    @IsNotEmpty()
    userid: number;

}