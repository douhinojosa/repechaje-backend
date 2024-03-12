import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("favorites")
export class Favorite {
    @PrimaryGeneratedColumn()
    id!: number

    @Column("integer")
    id_user!: number

    @Column("integer")
    id_business!: number 

    @CreateDateColumn()
    createdDate!: Date

    @UpdateDateColumn()
    updatedDate!: Date 
}