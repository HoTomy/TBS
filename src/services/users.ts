import {Users} from '../entities/users'
import database from "../utils/database"

const getAll = async () => {
    const dataRepository = database.AppDataSource.getRepository(Users)
    return await dataRepository.find()
}

const getById = async (id: number) => {
    const dataRepository = database.AppDataSource.getRepository(Users)
    return await dataRepository.findOneBy({id: id})
}

const getByUsername = async (username: string) => {
    const dataRepository = database.AppDataSource.getRepository(Users)
    return await dataRepository.findOneBy({username: username})
}

const filter = async (data: Users) => {
    const dataRepository = database.AppDataSource.getRepository(Users)
    return await dataRepository.findBy({...data})
}

const create = async (data: Users) => {
    const dataRepository = database.AppDataSource.getRepository(Users)
    return await dataRepository.save(data)
}

const update = async (id: number, data: Users) => {
    const dataRepository = database.AppDataSource.getRepository(Users)
    const findById = await getById(id)
    if (findById != null) {
        const updateData = {...findById, ...data}
        return await dataRepository.save(updateData)
    } else
        return null

}

const remove = async (id: number) => {
    const dataRepository = database.AppDataSource.getRepository(Users)
    const findById = await getById(id)
    if (findById != null)
        return await dataRepository.remove(findById)
    else
        return null
}

const checkUserExist = async (username: string, email: string) => {
    const dataRepository = database.AppDataSource.getRepository(Users)
    const queryBuilder = dataRepository.createQueryBuilder('users')
    queryBuilder.orWhere('users.username = :username', {username: username})
    queryBuilder.orWhere('users.email = :email', {email: email})
    return await queryBuilder.getMany()
}

export default {getAll, getById, getByUsername, filter, create, update, remove, checkUserExist}