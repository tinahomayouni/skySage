// auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from 'src/entity/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findOne(username);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  // async login(user: User) {
  //   const payload = { username: user.username, sub: user.id, role: user.role };
  //   return {
  //     access_token: this.jwtService.sign(payload),
  //   };
  // }
}
