import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BoardStatus } from "./board-status.enum";
import { Reply } from "src/reply/reply.entity";

@Entity()
export class Board extends BaseEntity{
    @PrimaryGeneratedColumn()
    boardId: number; //게시물 id

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

    @Column({type: 'jsonb', nullable: true})
    replys: string[]; // Reply 엔티티의 배열
    
    @OneToMany(() => Reply, reply => reply.board)
    replies: Reply[]; // Board 엔티티에 Reply 엔티티의 배열을 정의합니다.
}