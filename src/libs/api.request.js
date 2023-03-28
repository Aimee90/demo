import Qs from 'qs'
import HttpRequest from '@/libs/axios'
import { getToken } from '@/libs/util'

const baseUrl = ''
let _axios = new HttpRequest(baseUrl)
let defaults = ()=>{
  return {
    'headers': {
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization': 'Member-Bearer ' + getToken() ,
    }
  }
}
/**
 *
 */
export const $post = (url, data={}, externals) => {
  let req = {
    url,
    method: 'post'
  }
  return _axios.request(_.assign(req, {data}, _.assign(defaults(), externals)))
}

export const $query = (url, data, externals) => {
  let req = {
    url,
    method: 'post'
  }
  return _axios.request(_.assign(req, {data}, Qs.stringify(_.assign(defaults(), externals))))
}

/**
 *
 */
export const $get = (url, params, externals) => {
  let req = {
    url,
    method: 'get'
  }
  return _axios.request(_.assign(req, {params}, _.assign(defaults(), externals)))
}

/**
 *
 */
export const axios = _axios
