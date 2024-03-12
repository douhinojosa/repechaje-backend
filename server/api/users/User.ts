import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

export type UserRole = 'admin' | 'user';

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({type: "varchar", length: 100, })
    email!: string

    @Column({type: "varchar", length: 100 })
    password!: string

    @Column({type: "varchar", length: 50 })
    username!: string

    @Column("double")
    balance!: number

    @Column({type: "enum", enum: ['admin', 'user'], default: 'user'} )
    role!: UserRole

    @Column({ type: "varchar", length: 255 })
    token!: string

    @Column ("double")
    lat!: number

    @Column ("double")
    lon!: number

    @CreateDateColumn()
    createdDate!: Date

    @UpdateDateColumn()
    updatedDate!: Date 
}