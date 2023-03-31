import {Context} from "koa";
import itemsRepository from '../services/items'
import {Items} from "../entities/items";

const getAll = async (ctx: Context, next: any) => {
    ctx.body = await itemsRepository.getAll()
    await next()
}
const getById = async (ctx: Context, next: any) => {
    ctx.body = await itemsRepository.getById(+ctx.params.id)
    await next()
}

const add = async (ctx: Context, next: any) => {
    ctx.body = await itemsRepository.create(<Items>ctx.request.body)
    await next()
}

const update = async (ctx: Context, next: any) => {
    ctx.body = await itemsRepository.update(+ctx.params.id, <Items>ctx.request.body)
    await next()
}

const remove = async (ctx: Context, next: any) => {
    ctx.body = await itemsRepository.remove(+ctx.params.id) ? {message: "Item deleted successfully"} : null
    await next()
}

export default {getAll, getById, add, update, remove}