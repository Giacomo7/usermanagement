import { Injectable } from '@nestjs/common';
import {Repository} from "typeorm";

import {UsersEntity} from "./users.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {UsersDTO} from "./users.dto";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersEntity)
        private usersRepository: Repository<UsersEntity>
    ){}

    async showAll(){
        return await this.usersRepository.find();
    }

    async create(data: UsersDTO){
        const user = await this.usersRepository.create(data);
        await this.usersRepository.save(data);
        return user;
    }

    async read(id: string){
        return await this.usersRepository.findOne({where: {id:id}});
    }

    async update(id: string, data: Partial<UsersDTO>){
        await this.usersRepository.update({id}, data);
        return await this.usersRepository.findOne({'id': id});
    }

    async destroy(id:string){
        await this.usersRepository.delete({id});
        return { deleted: true };
    }
}
