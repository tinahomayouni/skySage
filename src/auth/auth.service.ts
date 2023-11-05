// auth/auth.service.ts
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserUpdateDto } from 'src/user/dto/user.update.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) // Inject the User repository
    private userRepository: Repository<User>, // Declare userRepository
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userRepository.findOne({ where: { username } }); // Use FindOneOptions
    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }
    return null;
  }

  async login(username: string, password: string): Promise<string> {
    // Find the user by username
    const user = await this.userRepository.findOne({ where: { username } });

    if (!user) {
      // User not found
      throw new UnauthorizedException('User not found');
    }

    // Check if the provided password matches the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      // Password does not match
      throw new UnauthorizedException('Incorrect password');
    }

    // If the username and password are correct, generate a JWT token
    const payload = { sub: user.id, username: user.username };
    const token = this.jwtService.sign(payload);

    return token;
  }
  async signUpUser(username: string, password: string): Promise<string> {
    // Hash the user's password
    const hashedPassword = await bcrypt.hash(password, 10);
    //const hashedPassword = await encode(password, 10);
    // Create a new user entity
    const newUser = this.userRepository.create({
      username,
      password: hashedPassword,
    });

    // Save the user to the database
    await this.userRepository.save(newUser);

    return 'User successfully signed up';
  }
  async editUser(id: number, updateDto: UserUpdateDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Update user information
    if (updateDto.username) {
      user.username = updateDto.username;
    }

    if (updateDto.password) {
      const hashedPassword = await bcrypt.hash(updateDto.password, 10);
      user.password = hashedPassword;
    }

    const updatedUser = await this.userRepository.save(user);

    return updatedUser;
  }
  async deleteUser(id: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userRepository.remove(user);
  }
}
