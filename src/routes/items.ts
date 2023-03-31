import Router from 'koa-router'
import controller from '../controllers/items'
import validator from '../middlewares/validator'

const router = new Router({
    prefix: '/items'
})

router.get('/', controller.getAll)
router.get('/:id', validator.validateId, controller.getById)
router.post('/', validator.validateItem.createData, controller.add)
router.put('/:id', validator.validateId, validator.validateItem.updateData, controller.update)
router.delete('/:id', validator.validateId, controller.remove)

export default router