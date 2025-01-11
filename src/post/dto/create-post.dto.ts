import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class createPostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  link: string;

  @IsString()
  @IsNotEmpty()
  subject: string;
}
