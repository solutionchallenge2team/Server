import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { UserLevel } from "../mypage/userlevel.enum";
import { Board } from "src/boards/board.entity";

@Entity()
@Unique(['nickname'])
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    userid: number;

    @Column()
    nickname: string;

    @Column()
    email: string;

    @Column()
    password: string;
    
    @Column()
    userLevel: UserLevel;

    @Column()
    community: string;

    @OneToMany(type => Board, board => board.user)
    boards: Board[];
    // //유저가 작성한 글을 엔티티에 리스트로 포함시켜야한다. 
}