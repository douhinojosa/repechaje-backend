import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("ticket_product")
export class Ticket_Product {
    @PrimaryGeneratedColumn()
    id!: number

    @Column("integer")
    id_ticket!: number

    @Column("integer")
    id_product!: number 

    @Column("integer")
    total_products!: number

    @CreateDateColumn()
    createdDate!: Date

    @UpdateDateColumn()
    updatedDate!: Date 
}