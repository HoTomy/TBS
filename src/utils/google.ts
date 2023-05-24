import * as dotenv from "dotenv"
import axios from "axios";

dotenv.config()

const getUserDetails = async (code: string) => {
    return await axios
        .get('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: {Authorization: `Bearer ${code}`},
        })
        .then(res => res.data);
}
export default {getUserDetails}