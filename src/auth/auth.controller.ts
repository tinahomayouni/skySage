import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { LoginRequestDto } from './dto/login.request.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller()
export class AuthController {
  constructor() {}

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  async login(@Body() body: LoginRequestDto) {
    console.log(body);
    //{username, password} = const Body;
  }
}
