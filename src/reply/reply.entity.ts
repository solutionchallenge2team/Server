import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Board } from "src/boards/board.entity";;

@Entity()
export class Reply extends BaseEntity {
    @PrimaryGeneratedColumn()
    replyId: number; // 댓글 id

    @Column()
    replyContent: string; // 댓글 내용

    @ManyToOne(() => Board, board => board.replies)
    board: Board; // Reply 엔티티에 Board 엔티티와의 관계를 정의합니다.
}
