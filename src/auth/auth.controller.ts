import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { LoginRequestDto } from './dto/login.request.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { Roles } from './user-roles.decorator';
import { SignupDto } from 'src/user/dto/user.request.dto';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @Roles('admin')
  @HttpCode(201)
  async signup(@Body() signupDto: SignupDto): Promise<string> {
    const { username, password } = signupDto;
    return this.authService.signupUser(username, password);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  async login(@Body() body: LoginRequestDto) {
    const { username, password } = body;
    const token = await this.authService.login(username, password);

    return { access_token: token };
  }
}
