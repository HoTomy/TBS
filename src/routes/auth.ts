import Router from 'koa-router'
import auth from '../middlewares/auth'
import validator from '../middlewares/validator'

const router = new Router({
    prefix: '/auth'
})

router.post('/refresh', validator.validateAuth.refreshToken, auth.authRefreshJwt, auth.refreshJwt)
router.get('/google', auth.authGoogle)

export default router