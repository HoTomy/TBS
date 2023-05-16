import database from "./utils/database";

const create = async () => {
    await database.AutoCreateDatabase()
    await database.AppDataSource.initialize()
}

const close = async () => {
    await database.AppDataSource.destroy()
}

const testConnection = {create, close}

export default testConnection