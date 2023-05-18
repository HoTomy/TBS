import {Context} from "koa";
import likesRepository from '../services/likes'
import {Likes} from "../entities/likes";
import {Users} from "../entities/users";

const getAll = async (ctx: Context, next: any) => {
    ctx.body = await likesRepository.getAll()
    await next()
}

const add = async (ctx: Context, next: any) => {
    const requestBody = <Likes>ctx.request.body
    ctx.body = await likesRepository.create(requestBody).then(res => console.log(res)).catch(err => console.log(err))
    ctx.status = 200
    await next()
}

const remove = async (ctx: Context, next: any) => {
    const currentUser = <Users>ctx.state.user.data
    ctx.body = await likesRepository.remove(+ctx.params.id, currentUser) ? {message: "Item deleted successfully"} : {message: "Item not found!"}
    ctx.status = 200
    await next()
}

export default {getAll, add, remove}