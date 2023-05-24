import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Pets} from "./pets";

@Entity()
export class PetPhotos {
    @PrimaryGeneratedColumn()
    id!: number
    @Column()
    filename!: string
    @Column({type: "longtext"})
    base64!: string
    @ManyToOne(() => Pets, pets => pets.pet_photos)
    pet!: Pets
    @CreateDateColumn()
    created_at!: Date
    @UpdateDateColumn()
    updated_at!: Date
}