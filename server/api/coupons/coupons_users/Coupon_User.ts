import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

export type Status = 'active' | 'used' | 'out';

@Entity("coupons_users")
export class Coupon_User {
    @PrimaryGeneratedColumn()
    id!: number

    @Column("integer")
    id_user!: number

    @Column("integer")
    id_coupon!: number 

    @Column({type: "enum", enum: ['active', 'used', 'out'], default: 'active'})
    status!: Status

    @CreateDateColumn()
    createdDate!: Date

    @UpdateDateColumn()
    updatedDate!: Date 
}
