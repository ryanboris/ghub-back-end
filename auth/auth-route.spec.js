const request = require('supertest');
const server = require('../api/server.js');

const db = require('../database/dbConfig.js')

describe('Authetication', () => {
    afterEach(async () => {
        await db('users').truncate()
    })

    describe('Post /api/auth/users', () => {
        it('Should insert user to database', async() => {
            const res = await request(server).post('/api/auth/register').send({
                username: 'test', 
                password: 'pass',
                email: 'test@testing.test'
            });

            expect(res.body).toEqual([1])
        });

        it('Should return JSON', async() => {
            const res = await request(server).post('/api/auth/register').send({
                username: 'test', 
                password: 'pass',
                email: 'test@testing.test'
            });

            expect(res.type).toBe('application/json')
        });
    });

    describe('Post /api/auth/login', () => {
        it('Should return JSON', async() => {
            const res = await request(server).post('/api/auth/login').send({ username: 'test', password: 'pass'});

            expect(res.type).toBe('application/json')
        });
    });
});