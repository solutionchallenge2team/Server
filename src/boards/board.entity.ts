import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BoardStatus } from "./board-status.enum";
import { Reply } from "src/reply/reply.entity";
import { User } from "src/user/user.entity";
import exp from "constants";

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

    @Column("text", {array: true})
    photos: string[];

    @CreateDateColumn()
    date: Date;         //날짜

    @Column()
    status: BoardStatus;//노출기간만료여부

    @ManyToOne(type => User, user=>user.boards, {eager: true})
    user: User;

    @OneToMany(() => Reply, reply => reply.board, {eager: true})
    replies: Reply[]; // Board 엔티티에 Reply 엔티티의 배열을 정의합니다.

    async updateStatus() {
        const now = new Date();
        const expirationDate = new Date(this.date);
        expirationDate.setDate(expirationDate.getDate() + this.user.community.postsExposurePeriod);

        if (now > expirationDate){
            this.status = BoardStatus.EXPIRED;
            await this.save();
        }
    }
}