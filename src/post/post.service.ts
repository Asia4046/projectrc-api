import { Injectable } from '@nestjs/common';
import { CreatePostDto, EditPostDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PostService {

  constructor(private prisma: PrismaService) {}

  getPosts(userId: number) {
    return this.prisma.post.findMany({
      where: {
        userId,
      }
    })
  }

  async createPost(userId: number, dto: CreatePostDto) {
    const post = await this.prisma.post.create({
      data: {
        userId,
        ...dto,
      }
    })

    return post;
  }

  getPostById(userId: number, postId: number) {}

  editPostById(userId: number, dto: EditPostDto, postId: number) {}

  deletePostById(userId: number, postId: number) {}
}
