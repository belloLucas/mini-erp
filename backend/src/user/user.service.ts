import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUserDto';
import { UpdateUserDto } from './dto/UpdateUserDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserDto } from './dto/UserDto';
import { hashSync as bcryptHashSync } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(newUser: CreateUserDto) {
    const userAlreadyRegistered = await this.findByCpf(newUser.cpf);
    if (userAlreadyRegistered) {
      throw new ConflictException(`User with CPF ${newUser.cpf} already exists`);
    }

    const dbUser = new User();

    dbUser.name = newUser.name;
    dbUser.email = newUser.email;
    dbUser.password = bcryptHashSync(newUser.password, 10);
    dbUser.cpf = newUser.cpf;
    dbUser.created_at = new Date();
    dbUser.updated_at = new Date();

    const { id, name } = await this.userRepository.save(dbUser);

    return { id, name };
  }

  async findAll(): Promise<UserDto[] | null> {
    const users = await this.userRepository.find();
    return users.map((user) => new UserDto(user));
  }

  async findById(id: string): Promise<UserDto | null> {
    const userFound = await this.userRepository.findOne({
      where: { id },
    });

    if (!userFound) {
      return null;
    }

    return new UserDto(userFound);
  }

  async findByCpf(cpf: string): Promise<UserDto | null> {
    const userFound = await this.userRepository.findOne({
      where: { cpf },
    });
    if (!userFound) {
      return null;
    }
    return new UserDto(userFound);
  }

  async findByEmail(email: string): Promise<UserDto | null> {
    const userFound = await this.userRepository.findOne({
      where: { email },
    });
    if (!userFound) {
      return null;
    }
    return new UserDto(userFound);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<{ message: string } | null> {
    const userFound = await this.userRepository.findOne({
      where: { id },
    });

    if (!userFound) {
      return { message: 'User not found' };
    }

    const updateData = { ...updateUserDto };

    if (updateUserDto.password) {
      updateData.password = bcryptHashSync(updateUserDto.password, 10);
    }

    const result = await this.userRepository.update(id, updateData);

    if (!result.affected || result.affected === 0) {
      throw new BadRequestException('Failed to update user');
    }

    const updatedFields = Object.keys(updateUserDto);
    let message = 'User updated successfully';
    if (updatedFields.length === 1 && updatedFields[0] === 'password') {
      message = `Password updated successfully`;
    }

    return { message };
  }

  async remove(id: string): Promise<{ message: string } | null> {
    const userFound = await this.userRepository.findOne({
      where: { id },
    });

    if (!userFound) {
      return { message: 'User not found' };
    }

    const result = await this.userRepository.delete(id);

    if (!result.affected || result.affected === 0) {
      throw new BadRequestException('Failed to delete user');
    }

    return { message: 'User deleted successfully' };
  }
}
