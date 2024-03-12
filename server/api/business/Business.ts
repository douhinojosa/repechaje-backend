import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("business")
export class Business {
    @PrimaryGeneratedColumn()
    id!: number

    @Column("integer")
    id_user!: number

    @Column({type: "varchar", length: 255 })
    name!: string

    @Column({type: "varchar", length: 50 })
    rif!: string

    @Column("text")
    description!: string

    @Column ({type: "varchar", length: 50 })
    lat!: string

    @Column ({type: "varchar", length: 50 })
    lon!: string

    @Column({type: "varchar", length: 50 })
    suburb!: string

    @Column({type: "varchar", length: 50 })
    county!: string

    @Column("text")
    logo!: string

    @Column({type: "varchar", length: 50 })
    type!: string

    @CreateDateColumn()
    createdDate!: Date

    @UpdateDateColumn()
    updatedDate!: Date 
}