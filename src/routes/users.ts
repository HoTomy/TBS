import Router from 'koa-router'
import controller from '../controllers/users'
import validator from '../middlewares/validator'

const router = new Router({
    prefix: '/user'
})

router.post('/login', validator.validateUser.login, controller.login)
router.post('/register', validator.validateUser.register, controller.register)


export default router