import Joi from "joi";

const refreshToken = Joi.object({
    refresh: Joi.string().required()
})

export default {refreshToken}