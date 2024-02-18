import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Board } from "src/boards/board.entity";;

@Entity()
export class Reply extends BaseEntity {
    @PrimaryGeneratedColumn()
    replyId: number; // 댓글 id

    @Column()
    content: string; // 댓글 내용

    @ManyToOne(() => Board, board => board.replys) // ManyToOne 관계 설정
    board: Board; // Board 엔티티와의 관계
}
