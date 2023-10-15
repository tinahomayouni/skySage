import { Body, Controller, Post } from '@nestjs/common';
import { LoginRequestDto } from './dto/login.request.dto';

@Controller()
export class AuthController {
  constructor() {}
  @Post('/login')
  async login(@Body() body: LoginRequestDto) {
    //{username, password} = const Body;
  }
}
