import {Context, Next} from "koa";
import schema from "../schemas/auth";

const refreshToken = async (ctx: Context, next: Next) => {
    const schemaReference = schema.refreshToken

    const {error} = schemaReference.validate({...ctx.request.body}, {abortEarly: false})

    if (error) {
        ctx.status = 400
        ctx.body = {
            message: error.details.map((detail) => detail.message)
        }
        return
    }

    await next()
}

export default {refreshToken}