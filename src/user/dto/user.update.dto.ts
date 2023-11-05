// user-update.dto.ts
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UserUpdateDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  username?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  password?: string;
}
