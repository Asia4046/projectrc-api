import {
  Body,
  Controller,
  Get,
  Patch,
  Search,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { EditUserDto } from './dto';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { emit } from 'process';

@Controller('users')
@UseGuards(JwtGuard)
export class UserController {
  constructor(
    private userService: UserService,
    private prisma: PrismaService,
  ) {}

  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @Patch()
  editUser(@GetUser('id') userId: number, @Body() dto: EditUserDto) {
    return this.userService.editUser(userId, dto);
  }
}
