import {Likes} from '../entities/likes'
import database from "../utils/database"
import {Users} from "../entities/users";

const getAll = async () => {
    const dataRepository = database.AppDataSource.getRepository(Likes)
    return await dataRepository.find()
}

const getById = async (id: number) => {
    const dataRepository = database.AppDataSource.getRepository(Likes)
    return await dataRepository.findOneBy({id: id})
}

const create = async (data: Likes) => {
    const dataRepository = database.AppDataSource.getRepository(Likes)
    return await dataRepository.save(data)
}

const remove = async (id: number, currentUser: Users) => {
    const dataRepository = database.AppDataSource.getRepository(Likes)
    const findById = await getById(id)
    if (findById != null) {
        if (currentUser.id != findById.user_id)
            return null
        return await dataRepository.remove(findById)
    } else
        return null
}

export default {getAll, getById, create, remove}