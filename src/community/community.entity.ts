import { BaseEntity, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['communityName'])
export class Community extends BaseEntity{
    @PrimaryGeneratedColumn()
    communityId: number;

    @Column()
    communityName: string;

    @Column()
    postsExposurePeriod: number;
}