import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { PostService } from './post.service';

@UseGuards(JwtGuard)
@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  getPost() {}

  @Post()
  createPost() {}

  @Get()
  getPostById() {}

  @Patch()
  editPostById() {}

  @Delete()
  deletePostById() {}
}
