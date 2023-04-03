import Router from 'koa-router'
import auth from '../middlewares/auth'
import validator from '../middlewares/validator'
import {Context} from "koa";

const router = new Router({
    prefix: '/auth'
})

router.post('/refresh', validator.validateAuth.refreshToken, auth.authRefreshJwt, auth.refreshJwt)

router.get('/google', auth.authGoogle)
router.get('/google/callback', auth.authGoogleCallback)
router.get('/google/check', (ctx:Context) => {
    const token = ctx.session!.googleToken
    const user = ctx.session!.user
    if(!token || !user){
        ctx.status = 401
        ctx.body = {
            err: 'Invalid google auth, please login again!'
        }
    }
    ctx.status = 200
    ctx.body = {
        message: `Welcome, ${user.nickname}`,
        token: token
    }

})

export default router