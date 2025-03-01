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

  describe('POST /role', () => {
    it('should be rejected if request is invalid', async () => {
      const response = await request(app.getHttpServer()).post('/role').send({
        name: '',
      });

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });

    it('should be rejected if request is invalid', async () => {
      const response = await request(app.getHttpServer()).post('/role').send({
        name: '',
      });

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });
  });
});
