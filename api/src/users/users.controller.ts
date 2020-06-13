import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { DeleteResult } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Post('create')
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.create(createUserDto);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<User> {
    return await this.usersService.findById(id);
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string): Promise<DeleteResult> {
    return await this.usersService.delete(id);
  }

  @Post('update')
  async update(@Body() updateUserDto: UpdateUserDto): Promise<User> {
    return await this.usersService.update(updateUserDto);
  }

}
