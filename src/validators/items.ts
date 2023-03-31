import {Context, Next} from "koa";
import itemSchema from "../schemas/items";

const createData = async (ctx: Context, next: Next) => {
    const schema = itemSchema.create

    const {error} = schema.validate({...ctx.request.body}, {abortEarly: false})

    if (error) {
        ctx.status = 400
        ctx.body = {
            message: error.details.map((detail) => detail.message)
        }
        return
    }

    await next()
}

const updateData = async (ctx: Context, next: Next) => {
    const schema = itemSchema.update

    const {error} = schema.validate({...ctx.request.body}, {abortEarly: false})

    if (error) {
        ctx.status = 400
        ctx.body = {
            message: error.details.map((detail) => detail.message)
        }
        return
    }

    await next()
}

export default {createData, updateData}