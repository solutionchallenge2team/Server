import { User } from "src/user/user.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['communityName'])
export class Community extends BaseEntity{
    @PrimaryGeneratedColumn()
    communityId: number;

    @Column()
    communityName: string;

    @Column()
    postsExposurePeriod: number;

    @OneToMany(type => User, user => user.community, {eager: false})
    user: User[];
}