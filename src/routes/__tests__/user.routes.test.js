const supertest = require('supertest');
const app = require('../../app');
const config = require('../../config/config');

describe('Test User Routes', () => {
    it('GET /user/self - should return not authorized response (MISSING AUTHENTICATION)', async () => {
        const response = await supertest(app)
            .get(`/api/${config.API_VERSION}/user/self`);

        expect(response.statusCode).toEqual(401);
    });

    it('GET /user/self - should return not authorized response (INACTIVE USER)', async () => {
        const response = await supertest(app)
            .get(`/api/${config.API_VERSION}/user/self`).auth('john.doe', '123456')

        expect(response.statusCode).toEqual(401);
    });

    it('GET /user/self - should return successful response (ACTIVE USER)', async () => {
        const response = await supertest(app)
            .get(`/api/${config.API_VERSION}/user/self`).auth('andre.freitas', '123456')

        expect(response.statusCode).toEqual(200);
        expect(response.body.id).toEqual(1);
        expect(response.body.status).toEqual('ACTIVE');
        expect(response.body.userName).toEqual('andre.freitas');
    });
});