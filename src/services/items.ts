import {Items} from '../entities/items'
import database from "../utils/database"

const getAll = async () => {
    const dataRepository = database.AppDataSource.getRepository(Items)
    return await dataRepository.find()
}

const getById = async (id: number) => {
    const dataRepository = database.AppDataSource.getRepository(Items)
    return await dataRepository.findOneBy({id: id})
}

const create = async (data: Items) => {
    const dataRepository = database.AppDataSource.getRepository(Items)
    return await dataRepository.save(data)
}

const update = async (id: number, data: Items) => {
    const dataRepository = database.AppDataSource.getRepository(Items)
    const findById = await getById(id)
    if (findById != null) {
        const updateData = {...findById, ...data}
        return await dataRepository.save(updateData)
    } else
        return null
}

const remove = async (id: number) => {
    const dataRepository = database.AppDataSource.getRepository(Items)
    const findById = await getById(id)
    if (findById != null)
        return await dataRepository.remove(findById)
    else
        return null
}

export default {getAll, getById, create, update, remove}