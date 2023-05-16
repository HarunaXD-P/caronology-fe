import axios from 'axios'
import { utils } from '@/common/utils'

const __DEFAULT_PARAMS__ = {
	web_version: '1.0.0',
}

window.SUPPORT_WEBP = undefined
export function axiosGetHandler(url, args = {}, apps = {}) {
	let params = Object.assign({}, __DEFAULT_PARAMS__, apps, args)
	if (window.SUPPORT_WEBP == undefined) {
		return Promise.all([httpRequest('GET', url, params), utils.webpFormat()]).then(res_list => res_list[0])
	} else {
		return httpRequest('GET', url, params)
	}
}

export function axiosPostHandler(url, args = {}, formdata, apps = {}) {
	let params = Object.assign({}, __DEFAULT_PARAMS__, apps, args)
	if (window.SUPPORT_WEBP == undefined) {
		return Promise.all([httpRequest('POST', url, params, formdata), utils.webpFormat()]).then(res_list => res_list[0])
	} else {
		return httpRequest('POST', url, params, formdata)
	}
}

function httpRequest(method, url, args, formdata) {
	if (method === 'POST') {
		return axios.post(url, formdata, {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
			},
			timeout: 10000,
			responseType: "json",
			params: args
		})
	} else {
		return axios.get(url, {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
			},
			timeout: 10000,
			responseType: "json",
			params: args
		})
	}
}