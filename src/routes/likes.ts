import Router from 'koa-router'
import controller from '../controllers/likes'
import auth from "../middlewares/auth";
import validator from "../middlewares/validator";

const router = new Router({
    prefix: '/like'
})

router.get('/', controller.getAll)
router.post('/', auth.authJwt, controller.add)
router.delete('/:id', auth.authJwt, validator.validateId, controller.remove)


export default router