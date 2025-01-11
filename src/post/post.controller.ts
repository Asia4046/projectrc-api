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
import { CreatePostDto, EditPostDto } from './dto';

@UseGuards(JwtGuard)
@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  getPost(@GetUser('id') userId: number) {}

  @Post()
  createPost(@GetUser('id') userId: number, @Body() dto: CreatePostDto) {}

  @Get(':id')
  getPostById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) postId: number,
  ) {}

  @Patch()
  editPostById(@GetUser('id') userId: number, @Body() dto: EditPostDto) {}

  @Delete()
  deletePostById(@GetUser('id') userId: number) {}
}
