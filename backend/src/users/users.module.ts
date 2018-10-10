import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";

import { UsersEntity } from './users.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {Photo} from "../photo/photo.entity";


@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [
      UsersService,
  ]

})
export class UsersModule {}
