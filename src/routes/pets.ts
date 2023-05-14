import Router from 'koa-router'
import controller from '../controllers/pets'
import validator from '../middlewares/validator'
import auth from "../middlewares/auth";

const router = new Router({
    prefix: '/pet'
})

router.get('/', controller.getAll)
router.post('/', auth.authJwt, validator.validatePet.create, controller.add)
router.get('/:id', validator.validateId, controller.getById)
router.put('/:id', auth.authJwt, validator.validateId, validator.validatePet.update, controller.update)
router.delete('/:id', auth.authJwt, validator.validateId, controller.remove)

export default router