import Router from 'koa-router'
import controller from '../controllers/items'
import validator from '../middlewares/validator'
import auth from "../middlewares/auth";

const router = new Router({
    prefix: '/item'
})

router.get('/', controller.getAll)
router.get('/:id', validator.validateId, controller.getById)
router.post('/', auth.authJwt, validator.validateItem.createData, controller.add)
router.put('/:id', auth.authJwt, validator.validateId, validator.validateItem.updateData, controller.update)
router.delete('/:id', auth.authJwt, validator.validateId, controller.remove)

export default router