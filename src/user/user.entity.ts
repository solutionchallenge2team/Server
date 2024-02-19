import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { UserLevel } from "./userlevel.enum";
import { Board } from "src/boards/board.entity";
import { Community } from "src/community/community.entity";

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

    @OneToMany(type => Board, board => board.user)
    boards: Board[];

    @ManyToOne(type=> Community, community => community.user)
    community: Community;
}