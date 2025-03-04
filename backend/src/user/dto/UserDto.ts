import { User, UserRole } from '../entities/user.entity';

export class UserDto {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  password?: string;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.role = user.role;
    this.password = user.password;
  }
}
