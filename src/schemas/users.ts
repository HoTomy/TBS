import Joi from "joi";

const register = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    avatar: Joi.string(),
    nickname: Joi.string(),
    gender: Joi.boolean()
})

const login = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
})

export default {register, login}