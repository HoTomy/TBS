import {OAuth2Client} from "google-auth-library"
import * as dotenv from "dotenv"

dotenv.config()

const getClient = () => {
    return new OAuth2Client({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        redirectUri: `http://${process.env.HOST}:${process.env.PORT}/api/auth/google/callback`
    })
}

const getAuthUrl = () => {
    const client = getClient()
    return client.generateAuthUrl({
        access_type: 'offline',
        scope: ['profile', 'email']
    })
}

const getAuthToken = async (code: string) => {
    const client = getClient()
    const {tokens} = await client.getToken(code)
    return tokens
}

const verifyAuthToken = async (idToken: string) => {
    const client = getClient()
    return await client.verifyIdToken({
        idToken: idToken,
        audience: process.env.GOOGLE_CLIENT_ID
    })
}
export default {getAuthUrl, getAuthToken, verifyAuthToken}