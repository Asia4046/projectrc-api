import { Injectable, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { PostDto } from './dto';

@Injectable()
export class PostService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
  ) {}

  async upload() {
    return 'Hello';
  }
}
