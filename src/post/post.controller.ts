import { Controller, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { ConfigService } from '@nestjs/config';
import { PostDto } from './dto';

@Controller('post')
export class PostController {
    constructor(private postService: PostService) {}

    @Post('upload')
    upload(dto: PostDto) {
        return this.postService.upload();
    }
}
