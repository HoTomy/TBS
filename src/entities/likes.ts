import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Likes {
    @PrimaryGeneratedColumn()
    id!: number
    @Column()
    user_id!: number
    @Column()
    pet_id!: number
}