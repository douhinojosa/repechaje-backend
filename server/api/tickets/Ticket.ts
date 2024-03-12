import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

export type T_Pay = 'divisas' | 'saldo';
export type Status = 'active' | 'cancelled' | 'resolved';

@Entity("tickets")
export class Ticket {
    @PrimaryGeneratedColumn()
    id!: number
 
    @Column("integer")
    id_user!: number

    @Column("integer")
    id_business!: number

    @Column("double")
    app_fee!: number;

    @Column("double")
    total_ticket!: number;

    @Column("integer")
    total_products!: number;

    @Column({type: "enum", enum: ['divisas', 'saldo'], default: 'saldo'})
    t_pay!: T_Pay

    @Column({type: "enum", enum: ['active', 'cancelled', 'resolved'], default: 'active'})
    status!: Status

    @CreateDateColumn()
    createdDate!: Date

    @UpdateDateColumn()
    updatedDate!: Date 
}