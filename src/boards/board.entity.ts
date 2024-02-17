import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BoardStatus } from "./board-status.enum";
import { User } from "src/auth/user.entity";

@Entity()
export class Board extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number; //게시물 id

    @Column()
    title: string;  //게시물 제목

    @Column()
    content: string;    //설명

    @Column()           
    hearts: number;     //공감 수

    @Column()           
    location: string;   //위치

    @CreateDateColumn()
    date: Date;         //날짜

    @Column()
    status: BoardStatus;//노출기간만료여부

    @Column()
    userid: number;     //userid
    
    // @ManyToOne(type => User, user => user.boards, {eager: false})
    // user: User;
}