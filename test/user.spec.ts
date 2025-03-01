import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('POST /user', () => {
    it('should be rejected if request is invalid', async () => {
      const response = await request(app.getHttpServer()).post('/user').send({
        username: '',
        name: '',
        roleId: '',
        password: '',
      });

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });
  });
});
