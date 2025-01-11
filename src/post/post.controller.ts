import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { PostService } from './post.service';
import { GetUser } from 'src/auth/decorator';
import { createPostDto } from './dto';

@UseGuards(JwtGuard)
@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  getPost(@GetUser('id') userId: number) {}

  @Post()
  createPost(@GetUser('id') userId: number, @Body() dto: createPostDto) {}

  @Get(':id')
  getPostById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) postId: number,
  ) {}

  @Patch()
  editPostById(@GetUser('id') userId: number) {}

  @Delete()
  deletePostById(@GetUser('id') userId: number) {}
}
