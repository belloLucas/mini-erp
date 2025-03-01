import { IsString, IsEmail, IsOptional, IsEnum } from 'class-validator';
import { UserRole } from '../entities/user.entity';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsEmail()
  readonly email?: string;

  @IsOptional()
  @IsString()
  readonly password?: string;

  @IsOptional()
  @IsEnum(UserRole)
  readonly role?: UserRole;
}
