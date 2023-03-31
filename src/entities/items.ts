import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
@Entity()
export class Items {
    @PrimaryGeneratedColumn()
    id!: number
    @Column({length: 100})
    name!: string
    @Column("text", {nullable: true})
    description!: string | null
}