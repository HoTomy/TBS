import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    JoinColumn,
    ManyToOne
} from "typeorm";
import {PetPhotos} from "./petPhotos";
import {Users} from "./users";

@Entity()
export class Pets {
    @PrimaryGeneratedColumn()
    id!: number
    @Column()
    type!: string
    @Column()
    pet_name!: string
    @Column({nullable: true})
    age!: number
    @Column()
    breed!: string
    @Column({nullable: true})
    gender!: string
    @OneToMany(() => PetPhotos, petPhotos => petPhotos.pet, {nullable: true})
    pet_photos!: PetPhotos[]
    @ManyToOne(() => Users)
    @JoinColumn()
    created_by!: Users
    @CreateDateColumn()
    created_at!: Date
    @ManyToOne(() => Users, {nullable: true})
    @JoinColumn()
    updated_by!: Users
    @UpdateDateColumn()
    updated_at!: Date
    @Column({default: true})
    is_active!: boolean
}