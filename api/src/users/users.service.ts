import { Injectable, ValidationPipe, HttpException, HttpStatus, Catch } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository, DeleteResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { validate } from 'class-validator';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
@Catch(Error)
export class UsersService {
  /**
   * 
   * @param usersRepository 
   */
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {};

  /**
   * Creates a new user
   * @param createUserDto 
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new User();

    createdUser.email = createUserDto.email;
    createdUser.nickname = createUserDto.nickname;
    createdUser.password = createUserDto.password;

    const errors = await validate(createdUser);

    if (errors.length > 0) {
      console.log(errors);
      throw new HttpException('Validation failed!',
        HttpStatus.BAD_REQUEST);
    }

    const duplicatedEmails = await this.usersRepository.find({ where: { email: createdUser.email } });

    if (duplicatedEmails.length > 0) {
      throw new HttpException('Email already exists', HttpStatus.CONFLICT);
    }

    return this.usersRepository.save(createdUser);
  }

  /**
   * Finds all users
   */
  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  /**
   * Finds a specific user by id
   * @param id 
   */
  findById(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  /**
   * Deletes a user by id
   * @param id 
   */
  delete(id: string): Promise<DeleteResult> {
    return this.usersRepository.delete(id);
  }

  /**
   * Updates user's information
   * @param updateUserDto 
   */
  async update(updateUserDto: UpdateUserDto): Promise<User> {
    const updatedUser = await this.usersRepository.findOne(updateUserDto.id);
    const oldEmail = updatedUser.email;

    updatedUser.email = updateUserDto.email || updatedUser.email;
    updatedUser.nickname = updateUserDto.nickname || updatedUser.nickname;
    updatedUser.password = updateUserDto.password || updatedUser.password;

    const duplicatedEmails = await this.usersRepository.find({ where: { email: updatedUser.email } });

    if (duplicatedEmails.length > 0 && oldEmail !== updatedUser.email) {
      throw new HttpException('Email already exists', HttpStatus.CONFLICT);
    }

    return this.usersRepository.save(updatedUser);
  }
}
