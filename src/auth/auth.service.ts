import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService) {}
  async signup(dto: AuthDto) {
    // Password Hash
    const hash = await argon.hash(dto.password);

    // Save USER
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
          username: dto.username
        },
      });

      return this.signToken(user.id, user.email, user.username)
   
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code == 'P2002') {
          throw new ForbiddenException('Creadentials Already Taken!!');
        }
      }
      throw error;
    }
  }

  async signin(dto: AuthDto) {
    // find user by email
    const user = await this.prisma.user.findUnique({
      where: {
        username: dto.username,
        email: dto.email,
      },
    });

    // if user does not exist throw execption
    if (!user) throw new ForbiddenException('Credentials Incorrect');

    // compare password hash
    const pwMatches = await argon.verify(user.hash, dto.password);

    // If passwords dont match, throw execption
    if (!pwMatches) throw new ForbiddenException('Incorrect Password!');

    // send back the user
    return this.signToken(user.id, user.email, user.username);
  }

  async signToken(userId: number, email: string, username: string): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
      username
    }

    const token =  await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: this.config.get('JWT_SECRET')
    });

    return {
      access_token: token, 
    };
  }
}
