import {Controller, Get, Post, Delete, Put, Body, Param} from '@nestjs/common';
import {UsersService} from './users.service';
import {UsersDTO} from "./users.dto";

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService){}

    @Get()
    showAllUsers(){
        return this.userService.showAll();
    }

    @Post()
    createUser(@Body() data: UsersDTO){
        return this.userService.create(data);
    }

    @Get(':id')
    readUser(@Param('id') id: string){
        return this.userService.read(id);
    }

    @Put(':id')
    updateIdea(@Param('id') id:string, @Body() data: Partial<UsersDTO>){
        return this.userService.update(id, data);
    }

    @Delete(':id')
    destroyUser(@Param('id') id:string){
        return this.userService.destroy(id);
    }
}
