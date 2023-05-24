import Koa from "koa"
import json from "koa-json";
import * as dotenv from "dotenv";
import request from "supertest";
import testConnection from "../src/utils/testHelper";
import Router from "koa-router";
import petsRouter from "../src/routes/pets";
import usersRouter from "../src/routes/users";
import {koaBody} from "koa-body";

dotenv.config()
const app: Koa = new Koa()
const port = process.env.PORT || 3000
app.use(json())
app.use(koaBody())
const mainRouter = new Router({prefix: "/api"})
mainRouter.use(petsRouter.routes(), petsRouter.allowedMethods())
mainRouter.use(usersRouter.routes(), usersRouter.allowedMethods())
app.use(mainRouter.routes())
app.listen(port)

beforeAll(async () => {
    await testConnection.create()
})

describe('User / - a user management api endpoint', () => {
    test('signup a staff user', async () => {
        const signup = await request(app.callback())
            .post('/api/user/signup')
            .set('Content-Type', 'application/json')
            .send({
                username: "wallykong0307",
                email: "wallykong0307@gmail.com",
                password: "123456",
                staff_code: "A0001"
            })
            .set('Accept', 'application/json')
        expect(signup.statusCode).toEqual(200)
    })

    test('login a staff user', async () => {
        const login = await request(app.callback())
            .post('/api/user/login')
            .set('Content-Type', 'application/json')
            .send({
                username: "wallykong0307",
                password: "123456",
            })
            .set('Accept', 'application/json')
        expect(login.statusCode).toEqual(200)
    })
})
describe('Pets / - a pets management api endpoint', () => {
    test('create a pet', async () => {
        const login = await request(app.callback())
            .post('/api/user/login')
            .set('Content-Type', 'application/json')
            .send({
                username: "wallykong0307",
                password: "123456",
            })
            .set('Accept', 'application/json')
        expect(login.statusCode).toEqual(200)
        const token = login.body
        const result = await request(app.callback()).post('/api/pet')
            .auth(token.token, {type: 'bearer'})
            .send({
                type: "dog",
                pet_name: "petloss",
                breed: "mix",
                age: 12,
                description: "This is my pet description!",
            })
        expect(result.statusCode).toEqual(200)
    })
    test('Get all pet', async () => {
        const result = await request(app.callback()).get('/api/pet')
        expect(result.statusCode).toEqual(200)
    })
    test('Get a pet', async () => {
        const result = await request(app.callback()).get('/api/pet/1')
        expect(result.statusCode).toEqual(200)
    })
    test('edit a pet', async () => {
        const login = await request(app.callback())
            .post('/api/user/login')
            .set('Content-Type', 'application/json')
            .send({
                username: "wallykong0307",
                password: "123456",
            })
            .set('Accept', 'application/json')
        expect(login.statusCode).toEqual(200)
        const token = login.body
        const result = await request(app.callback()).put('/api/pet/1')
            .auth(token.token, {type: 'bearer'})
            .send({
                pet_name: "NicePet",
            })
        expect(result.statusCode).toEqual(200)
    })
    test('delete a pet', async () => {
        const login = await request(app.callback())
            .post('/api/user/login')
            .set('Content-Type', 'application/json')
            .send({
                username: "wallykong0307",
                password: "123456",
            })
            .set('Accept', 'application/json')
        expect(login.statusCode).toEqual(200)
        const token = login.body
        const result = await request(app.callback()).delete('/api/pet/1')
            .auth(token.token, {type: 'bearer'})
        expect(result.statusCode).toEqual(200)
    })
})

afterAll(async () => {
    await testConnection.close()
})