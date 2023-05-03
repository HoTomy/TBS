import Koa, {Context, Next} from 'koa'
import {koaBody} from 'koa-body'
import session from "koa-session"
import json from "koa-json"
import Router from "koa-router"
import logger from 'koa-logger'
import database from "./utils/database";
import * as dotenv from 'dotenv'
import itemsRouter from './routes/items'
import usersRouter from './routes/users'
import authRouter from './routes/auth'
import petsRouter from './routes/pets'

(async () => {
    dotenv.config()
    await database.AutoCreateDatabase().then(() => {
        console.log('Initial database successfully!')
    })

    await database.AppDataSource.initialize().then(() => {
        console.log("Connect database successfully!")
        const app = new Koa()
        const port = process.env.PORT || 3000

        app.keys = ['my-session-secret']
        app.use(session(app))

        app.use(logger())
        app.use(json())
        app.use(koaBody({
            multipart: true,
            formidable: {
                maxFileSize: 200 * 1024 * 1024,
                uploadDir: __dirname + '/public/uploads'
            }
        }))

        const mainRouter = new Router({prefix: "/api"})
        mainRouter.use(itemsRouter.routes(), itemsRouter.allowedMethods())
        mainRouter.use(usersRouter.routes(), usersRouter.allowedMethods())
        mainRouter.use(authRouter.routes(), authRouter.allowedMethods())
        mainRouter.use(petsRouter.routes(), petsRouter.allowedMethods())

        app.use(mainRouter.routes())

        app.use(async (ctx: Context, next: Next) => {
            try {
                await next()
                if (ctx.status === 404){
                    ctx.status = 404
                    ctx.body = {err: "No such endpoint existed"}
                }
            } catch (err: any) {
                ctx.body = {err: err}
            }
        })

        app.listen(port).on("listening", () => console.log(`Server started on port: ${port}!`))
    }).catch((error) => console.log(error))
})()