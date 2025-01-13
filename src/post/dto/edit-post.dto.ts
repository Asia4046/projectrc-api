import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class EditPostDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  link?: string;

  @IsString()
  @IsOptional()
  subject?: string;

  @IsOptional()
  @IsString()
  grade?: string;
}
