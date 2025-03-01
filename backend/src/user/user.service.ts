import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUserDto';
import { UpdateUserDto } from './dto/UpdateUserDto';

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto): string {
    return `create() called with data: ${JSON.stringify(createUserDto)}`;
  }

  findAll(): string {
    return 'findAll() called - returning all users';
  }

  findOne(id: string): string {
    return `findOne() called with id: ${id}`;
  }

  update(id: string, updateUserDto: UpdateUserDto): string {
    return `update() called for id: ${id} with data: ${JSON.stringify(updateUserDto)}`;
  }
}
