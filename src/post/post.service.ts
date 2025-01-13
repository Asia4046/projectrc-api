import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreatePostDto, EditPostDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  getPosts(userId: number) {
    return this.prisma.post.findMany({
      where: {
        userId,
      },
    });
  }

  async createPost(userId: number, dto: CreatePostDto) {
    const post = await this.prisma.post.create({
      data: {
        userId,
        ...dto,
      },
    });

    return post;
  }

  getPostById(userId: number, postId: number) {
    return this.prisma.post.findFirst({
      where: {
        id: postId,
        userId,
      },
    });
  }

  async editPostById(userId: number, dto: EditPostDto, postId: number) {
    // Get post By Id
    const post = await this.prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post || post.userId != userId) {
      throw new ForbiddenException('Access to resource denied.');
    }

    return this.prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        ...dto,
      },
    });
  }

  async deletePostById(userId: number, postId: number) {
    const post = await this.prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post || post.userId != userId) {
      throw new ForbiddenException('Access to resource denied.');
    }

    await this.prisma.post.delete({
      where: {
        id: postId,
      },
    });
  }
}
