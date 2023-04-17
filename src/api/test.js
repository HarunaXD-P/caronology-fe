
import {axiosGetHandler, axiosPostHandler} from './config'

const BASE_API = process.env.IS_TEST == 'test' ? 'http://localhost:7001' : '';

export function getTest (args = {}) {
    let url = BASE_API + '/migration'
    console.log(url)
    return axiosGetHandler(url, args)
}