
import {axiosGetHandler, axiosPostHandler} from './config'

const BASE_API = process.env.IS_TEST == 'test' ? 'http://localhost:7001' : '';

export function getTest (args = {}) {
    let url = BASE_API + '/input/test_input'
    console.log(url)
    return axiosGetHandler(url, args)
}

export function postTest (args, form) {
    let url = BASE_API + '/input/test_post'
    return axiosPostHandler(url, args, form)
}