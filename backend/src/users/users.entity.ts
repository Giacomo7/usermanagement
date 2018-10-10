import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UsersEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ length: 50 })
    nome: string;

    @Column({ length: 50 })
    cognome: string;

    @Column({ length: 200 })
    email: string;
}