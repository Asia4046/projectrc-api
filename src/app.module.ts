import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { PostModule } from './post/post.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { HomeController } from './home/home.controller';
import { PostController } from './post/post.controller';
import { PostService } from './post/post.service';

@Module({
  imports: [
    AuthModule,
    UserModule,
    BookmarkModule,
    PostModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [HomeController, PostController],
  providers: [PostService],
})
export class AppModule {}
