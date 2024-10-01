import request from 'supertest';
import app from '../src/app';
import config from '../src/utils/config';

describe('Health Check', () => {
  test('Debería devolver un estado 200 y menjase de "api is up"', async () => {
    const response = await request(app.callback()).get('/health');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ 
      success: true,
      message: `The ${config().APP_NAME.name} api is up`,
      data: {
        status: 'up',
        errors: []
      }
     });
  });
});
