import {Context} from "koa";
import petsRepository from '../services/pets'
import {Pets} from "../entities/pets";
import {Users} from "../entities/users";

const getAll = async (ctx: Context, next: any) => {
    ctx.body = await petsRepository.getAll()
    await next()
}
const getById = async (ctx: Context, next: any) => {
    ctx.body = await petsRepository.getById(+ctx.params.id)
    await next()
}

const add = async (ctx: Context, next: any) => {
    const requestBody = <Pets>ctx.request.body
    requestBody.created_by = <Users>ctx.state.user.data
    ctx.body = await petsRepository.create(<Pets>ctx.request.body)
    ctx.status = 200
    await next()
}

const update = async (ctx: Context, next: any) => {
    const requestBody = <Pets>ctx.request.body
    requestBody.updated_by = <Users>ctx.state.user.data
    const result = await petsRepository.update(+ctx.params.id, <Pets>ctx.request.body)
    ctx.body = result ? result : {message: "Invalid request!"}
    ctx.status = 200
    await next()
}

const remove = async (ctx: Context, next: any) => {
    const currentUser = <Users>ctx.state.user.data
    ctx.body = await petsRepository.remove(+ctx.params.id, currentUser) ? {message: "Item deleted successfully"} : {message: "Item not found!"}
    ctx.status = 200
    await next()
}

export default {getAll, getById, add, update, remove}