import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import * as pactum from 'pactum';
import { todo } from 'node:test';
import { AuthDto } from 'src/auth/dto';

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
      email: "test@gmail.com",
      password: "test",
      username: "test"
    }
    describe('Signup', () => {
      it('Should Signup', () => {
        return pactum.spec().post('/auth/signup').withBody(dto).expectStatus(201).inspect();
      })
    })

    /* describe('Signin', () => {
      it('Should Signin', () => {
        return pactum.spec().post('/auth/signup').withBody(dto).expectStatus(200).inspect();
      })
    }) */
  })
  describe('User', () => {
    describe('Get Me', () => {})

    describe('Edit User', () => {})
  })
  describe('Posts', () => {
    describe('Create Posts', () => {})

    describe('Get Posts', () => {})

    describe('Create Posts by Id', () => {})

    describe('Update Posts', () => {})

    describe('Delete Posts', () => {})
    
  })

});
