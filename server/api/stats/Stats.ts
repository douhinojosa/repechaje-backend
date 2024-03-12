import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("stats")
export class Stat {
    @PrimaryGeneratedColumn()
    id!: number

    @Column("integer")
    id_user!: number

    @Column("double")
    kg_saved!: number;

    @Column("double")
    m_saved!: number;

    @Column("double")
    p_saved!: number;

    @CreateDateColumn()
    createdDate!: Date

    @UpdateDateColumn()
    updatedDate!: Date 
}