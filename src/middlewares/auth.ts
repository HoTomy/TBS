import {Context, Next} from "koa";
import authUtil from '../utils/auth'
import * as dotenv from 'dotenv'

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

export default {authJwt, authRefreshJwt, refreshJwt}