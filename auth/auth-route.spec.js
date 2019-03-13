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

        it('Should return 201 on successful login', async() => {
            const res = await request(server).post('/api/auth/register').send({
                username: 'test', 
                password: 'pass',
                email: 'test1@testing.test'
            });

            expect(res.status).toBe(201);
        });

        it('Should return 400 on Bad Request', async() => {
            const res = await request(server).post('/api/auth/register').send({
                username: 'test', 
                password: 'pass'
            });

            expect(res.status).toBe(400);
        });

        it('Should return JSON', async() => {
            const res = await request(server).post('/api/auth/register').send({
                username: 'test1', 
                password: 'pass',
                email: 'test1@testing.test'
            });

            expect(res.type).toBe('application/json')
        });
    });

    describe('Post /api/auth/login', () => {
        it('Should return JSON', async() => {
            const res = await request(server).post('/api/auth/login').send({ username: 'test', password: 'pass'});

            expect(res.type).toBe('application/json')
        });

        it('Should return unauthorized when credentials invalid', async() => {
            const res = await request(server).post('/api/auth/login').send({ username: 'test', password: 'pass'});

            expect(res.status).toBe(401)
        });
    });

    describe('Get /users', () => {
        it('Should return unauthorized with no token', async() => {
            const res = await request(server).get('/api/auth/users');

            expect(res.status).toBe(401)
        });
    });

    describe('Get /users/id', () => {
        it('Should return unauthorized with no token', async() => {
            const res = await request(server).get('/api/auth/users/4');

            expect(res.status).toBe(401)
        });
    });
});