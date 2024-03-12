import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("products")
export class Product {
    @PrimaryGeneratedColumn()
    id!: number

    @Column("integer")
    id_business!: number

    @Column({type: "varchar", length: 255 })
    business_id!: string

    @Column('text')
    logo!: string

    @Column({type: "varchar", length: 255 })
    name!: string

    @Column("text")
    description!: string

    @Column("integer")
    stock!: number

    @Column({type: "varchar", length: 100 })
    type!: string

    @Column("datetime")
    limit!: Date;

    @Column("double")
    kg!: number;

    @Column("double")
    app_price!: number;

    @Column("double")
    regular_price!: number;

    @CreateDateColumn()
    createdDate!: Date

    @UpdateDateColumn()
    updatedDate!: Date 
}