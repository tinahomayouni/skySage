import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { LoginRequestDto } from './dto/login.request.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { Roles } from './user-roles.decorator';
import { SignupDto } from 'src/user/dto/user.request.dto';
import { User } from 'src/entity/user.entity';
import { UserUpdateDto } from 'src/user/dto/user.update.dto';
import { JWTAuthGuard } from './guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from './guards/roles.guard';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @ApiBearerAuth()
  @UseGuards(JWTAuthGuard, RolesGuard)
  @Roles('admin')
  @HttpCode(201)
  async signup(@Body() signupDto: SignupDto): Promise<string> {
    const { username, password } = signupDto;
    return this.authService.signUpUser(username, password);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  async login(@Body() body: LoginRequestDto) {
    const { username, password } = body;
    const token = await this.authService.login(username, password);

    return { access_token: token };
  }

  @Put('user-edit/:id')
  @UseGuards(JWTAuthGuard)
  @Roles('admin')
  @HttpCode(200)
  async editUser(
    @Param('id') id: number,
    @Body() updateDto: UserUpdateDto,
  ): Promise<User> {
    return this.authService.editUser(id, updateDto);
  }
  @Delete('delete/:id')
  @Roles('admin')
  @HttpCode(204)
  async deleteUser(@Param('id') id: number): Promise<void> {
    await this.authService.deleteUser(id);
  }
}
