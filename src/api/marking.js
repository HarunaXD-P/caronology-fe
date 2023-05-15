
import { axiosGetHandler, axiosPostHandler } from './config'

const BASE_API = process.env.IS_TEST == 'test' ? 'http://localhost:7001' : '';

export function getYearEventList(args) {
  let url = BASE_API + '/input/get_year_event'
  return axiosGetHandler(url, args)
}

export function getEventDetail(args) {
  let url = BASE_API + '/input/get_event_proof'
  return axiosGetHandler(url, args)
}

export function uploadEditProof(args, form) {
  let url = BASE_API + '/input/edit_proof'
  return axiosPostHandler(url, args, form)
}

export function deleteRecord(args, form) {
  let url = BASE_API + '/input/delete_record'
  return axiosPostHandler(url, args, form)
}

export function uploadNewProof(args, form) {
  let url = BASE_API + '/input/save_proof'
  return axiosPostHandler(url, args, form)
}

export function uploadEditEvent(args, form) {
  let url = BASE_API + '/input/save_event'
  return axiosPostHandler(url, args, form)
}