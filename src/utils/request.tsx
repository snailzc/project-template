import {message} from 'antd';

import axios from 'axios';
import router from 'umi/router';


axios.defaults.headers['Content-Type'] = 'application/json';
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  token && ( config.headers.Authorization = token );
  return config;
});
axios.interceptors.response.use(response => {
  if ((response.data.status && response.data.status !== 200) || (response.data.code && response.data.code !== 200)) {
    return Promise.reject(response.data.message);
  }
  return response.data;
}, err => {
  if (err.response) {
    if (err.response.status === 401 || err.response.status === 4010001) {
      localStorage.clear()
      router.push('/login')
      return Promise.reject('');
    }
    return Promise.reject(err.response.data.message);
  }
  return Promise.reject(err.message);
});

export function get(url: string, params?: {[key: string]: any}) {
  return axios.get(url, {
    params,
  });
}
export function post(url: string, params?: {[key: string]: any}) {
  return axios.post(url, params);
}
export function put(url: string, params?: {[key: string]: any}) {
  return axios.put(url, params);
}
export function del(url: string, params?: {[key: string]: any}) {
  return axios.delete(url, {
    params,
  });
}




