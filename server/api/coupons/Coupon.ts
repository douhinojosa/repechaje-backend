import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("coupons")
export class Coupon {
    @PrimaryGeneratedColumn()
    id!: number

    @Column("integer")
    saldo!: number

    @Column("datetime")
    time!: Date;

    @CreateDateColumn()
    createdDate!: Date

    @UpdateDateColumn()
    updatedDate!: Date 
}