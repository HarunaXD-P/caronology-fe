
import {axiosGetHandler, axiosPostHandler} from './config'

const BASE_API = process.env.IS_TEST == 'test' ? 'http://localhost:7001' : '';

export function uploadFile (args = {}, form) {
    let url = BASE_API + '/input/upload_file'
    console.log(url)
    return axiosPostHandler(url, args, form)
}

export function getFileList(args) {
    let url = BASE_API + '/input/get_file_list'
    console.log(url)
    return axiosGetHandler(url, args)
}