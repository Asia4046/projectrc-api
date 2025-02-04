import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import * as pactum from 'pactum';
import { AuthDto } from 'src/auth/dto';
import { EditUserDto } from 'src/user/dto';
import { CreatePostDto, EditPostDto } from 'src/post/dto';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(3333);

    prisma = app.get(PrismaService);

    await prisma.cleanDb();
    pactum.request.setBaseUrl('http://localhost:3333');
  });

  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {
    const dto: AuthDto = {
      email: 'test@gmail.com',
      password: 'test',
      username: 'test',
    };
    describe('Signup', () => {
      it('Should Throw An Error If Email is Empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            password: dto.password,
            username: dto.username,
          })
          .expectStatus(400);
      });

      it('Should Throw An Error If Password is Empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            email: dto.email,
            username: dto.username,
          })
          .expectStatus(400);
      });

      it('Should Throw An Error If Username is Empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            email: dto.email,
            password: dto.password,
          })
          .expectStatus(400);
      });

      it('Should Throw An Error If No Body is Provided', () => {
        return pactum.spec().post('/auth/signup').expectStatus(400);
      });

      it('Should Signup', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201)
          .inspect();
      });
    });

    describe('Signin', () => {
      it('Should Signin', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(200)
          .stores('userAt', 'access_token');
      });

      it('Should Throw An Error If Email is Empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            password: dto.password,
            username: dto.username,
          })
          .expectStatus(400);
      });

      it('Should Throw An Error If Password is Empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            email: dto.email,
            username: dto.username,
          })
          .expectStatus(400);
      });

      it('Should Throw An Error If Username is Empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            email: dto.email,
            password: dto.password,
          })
          .expectStatus(400);
      });

      it('Should Throw An Error If No Body is Provided', () => {
        return pactum.spec().post('/auth/signin').expectStatus(400);
      });
    });
  });
  describe('User', () => {
    describe('Get Me', () => {
      it('Should get current user', () => {
        return pactum
          .spec()
          .get('/users/me')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200);
        // .inspect();
      });
    });

    describe('Edit User', () => {
      const dto: EditUserDto = {
        email: 'baka@gmail.com',
        firstName: 'esg',
        lastName: 'sd',
        username: 'assds',
      };
      it('Should edit user', () => {
        return pactum
          .spec()
          .patch('/users')
          .withBody(dto)
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectBodyContains(dto.email)
          .expectBodyContains(dto.username)
          .expectStatus(200);
        // .inspect();
      });
    });
  });
  describe('Posts', () => {
    describe('Get Empty Posts', () => {
      it('Should get posts', () => {
        return pactum
          .spec()
          .get('/posts')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          .expectBody([]);
      });
    });

    describe('Create Posts', () => {
      const dto: CreatePostDto = {
        title: 'New',
        link: 'jjj',
        subject: 'test',
        description: 'none',
        grade: 'X',
      };

      it('Should Create Post', () => {
        return pactum
          .spec()
          .post('/posts')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(dto)
          .expectStatus(201)
          .stores('postId', 'id');
      });
    });

    describe('Get Posts', () => {
      it('Should get posts', () => {
        return pactum
          .spec()
          .get('/posts')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          .expectJsonLength(1);
      });
    });

    describe('Create Posts by Id', () => {
      it('Should get post by id', () => {
        return pactum
          .spec()
          .get('/posts/{id}')
          .withPathParams('id', '$S{postId}')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          .expectBodyContains('$S{postId}');
      });
    });

    describe('Update Posts', () => {
      const dto: EditPostDto = {
        title: 'baka',
        subject: 'baka',
      };

      it('Should update post by id', () => {
        return pactum
          .spec()
          .patch('/posts/{id}')
          .withPathParams('id', '$S{postId}')
          .withBody(dto)
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          .expectBodyContains(dto.title)
          .expectBodyContains(dto.subject)
          .inspect();
      });
    });

    describe('Delete Posts', () => {
      it('Should delete post by id', () => {
        return pactum
          .spec()
          .delete('/posts/{id}')
          .withPathParams('id', '$S{postId}')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(204)
          .inspect();
      });
    });

    describe('Get Empty Posts', () => {
      it('Should get posts', () => {
        return pactum
          .spec()
          .get('/posts')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          .expectJsonLength(0);
      });
    });
  });
});
