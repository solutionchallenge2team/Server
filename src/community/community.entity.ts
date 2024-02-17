import { BaseEntity, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Community extends BaseEntity{
    @PrimaryGeneratedColumn()
    communityid: number;

    @Column()
    communityname: string;
}