import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';

@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async signup(dto: AuthDto) {
    // Password Hash
    const hash = await argon.hash(dto.password);

    // Save USER
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        hash,
      },
    });

    delete user.hash;

    return user;
  }

  signin() {
    return { msg: "Welcome to project-rc's auth page {signin} !" };
  }
}
