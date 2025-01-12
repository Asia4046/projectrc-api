import { Injectable } from '@nestjs/common';
import { CreatePostDto, EditPostDto } from './dto';

@Injectable()
export class PostService {
  getPost(userId: number) {}

  createPost(userId: number, dto: CreatePostDto) {}

  getPostById(userId: number, postId: number) {}

  editPostById(userId: number, dto: EditPostDto, postId: number) {}

  deletePostById(userId: number, postId: number) {}
}
