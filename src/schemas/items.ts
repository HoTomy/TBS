import Joi from "joi";

const create = Joi.object({
    name: Joi.string().required(),
    description: Joi.string()
})

const update = Joi.object({
    name: Joi.string(),
    description: Joi.string()
})

export default {create, update}