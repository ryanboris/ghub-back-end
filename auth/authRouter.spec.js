const request = require('supertest');
const router = require('./authRouter');

it('should return 200', async() => {
    const res = await request(router).get('/')
    expect(res.status).toBe(200)
})