import Axios from 'axios'

const baseUrl = 'http://localhost:1337'

export const axios = Axios.create({
    baseURL: `${baseUrl}/api`,
    timeout:1000,
    headers:{
        Accept: 'application/json',
        "Content-type": 'application/json'
    }
})