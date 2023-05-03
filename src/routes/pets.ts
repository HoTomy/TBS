import Router from 'koa-router'
import controller from '../controllers/pets'
import validator from '../middlewares/validator'
import auth from "../middlewares/auth";
import multer from 'koa-multer';

const router = new Router({
    prefix: '/pet'
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const ext = file.originalname.split('.').pop();
        cb(null, `${Date.now()}.${ext}`);
    },
});

const upload = multer({ storage });

router.get('/', controller.getAll)
router.get('/:id', validator.validateId, controller.getById)
router.post('/', auth.authJwt, controller.add)
router.put('/:id', auth.authJwt, validator.validateId, controller.update)
router.delete('/:id', auth.authJwt, validator.validateId, controller.remove)

export default router