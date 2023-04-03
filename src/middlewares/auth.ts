import {Context, Next} from "koa";
import authUtil from '../utils/auth'
import * as dotenv from 'dotenv'
import google from "../utils/google";
import usersService from "../services/users";
import {Users} from "../entities/users";
import {v4 as uuid} from 'uuid'
import usersRepository from "../services/users";

dotenv.config()

const authJwt = async (ctx: Context, next: Next) => {
    const authorizationHeader = ctx.header['authorization']
    if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
        const token = authorizationHeader.substring(7)
        try {
            ctx.state.user = await authUtil.verifyToken(token)
            await next()
        } catch (err) {
            ctx.status = 401
            ctx.body = {
                err: 'Invalid token'
            }
        }
    } else {
        ctx.status = 401
        ctx.body = {
            err: 'Invalid token'
        }
    }
}

const authRefreshJwt = async (ctx: Context, next: Next) => {
    const refresh = ctx.request.body.refresh

    try {
        ctx.state.user = await authUtil.verifyRefreshToken(refresh)
        await next()
    } catch (err) {
        ctx.status = 401
        ctx.body = {
            err: 'Invalid refresh token'
        }
    }
}

const refreshJwt = async (ctx: Context, next: Next) => {
    if (ctx.state.user != null)
        await authUtil.genJwt(ctx.state.user)
            .then((data) => {
                ctx.status = 200
                ctx.body = {
                    token: data.token,
                    refresh: data.refresh
                }
            })
    await next()
}

const authGoogle = async (ctx: Context) => {
    const authURL = google.getAuthUrl()
    ctx.redirect(authURL)
}

const authGoogleCallback = async (ctx: Context) => {
    const code = ctx.request.query.code as string
    const token = await google.getAuthToken(code)
    if (!token)
        ctx.redirect('/api/auth/google')

    const ticket = await google.verifyAuthToken(token.id_token as string)
    const payload = ticket.getPayload()
    console.log(payload)
    if (payload) {
        const user = await usersService.checkUserExist({email: payload.email, provider: 'google'})
        if (user) {
            ctx.session!.googleToken = token
            ctx.session!.user = user

            ctx.redirect('/api/auth/google/check')
        }else{
            const check = !!(await usersService.checkUserExist({email: payload.email}))
            if(check) {
                ctx.status = 409
                ctx.body = {
                    err: "User exist but not connect google oauth!"
                }
                return
            }

            const newGoogleUser = new Users()
            newGoogleUser.email = payload.email!
            newGoogleUser.username = payload.email!.split('@', 1)[0]
            newGoogleUser.provider = 'google'
            newGoogleUser.nickname = payload.name!
            await authUtil.hashPassword(uuid())
                .then((data) => {
                    newGoogleUser.password = data.hashedPassword
                    newGoogleUser.password_salt = data.salt
                }).catch((err) => {
                    ctx.status = 400
                    ctx.body = {err: err}
                    return
                })


            const result = await usersRepository.create(newGoogleUser)
            ctx.session!.googleToken = token
            ctx.session!.user = result

            ctx.redirect('/api/auth/google/check')
        }
    }
}

export default {authJwt, authRefreshJwt, refreshJwt, authGoogle, authGoogleCallback}