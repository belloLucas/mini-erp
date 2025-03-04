import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync, hashSync } from 'bcrypt';
import { UserDto } from 'src/user/dto/UserDto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserDto | null> {
    const user = await this.userService.findByEmail(email);
    if (user && user.password && compareSync(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException(`Invalid credentials`);
  }

  async login(user: UserDto) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
