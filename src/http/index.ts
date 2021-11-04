import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'

const isPro = process.env.NODE_ENV === 'production'

const http = axios.create({
  baseURL: isPro ? '' : '/api',
  timeout: 10000
})


http.interceptors.request.use((config: AxiosRequestConfig) => {
  nProgress.start()
  let token = localStorage.getItem('token')
  if (token) {
    config.headers!['Authorization'] = token
  }
  return config
}, (err: AxiosError) => {
  nProgress.done()
  return Promise.reject(err)
})


http.interceptors.response.use((res: AxiosResponse) => {
  nProgress.done()
  return res.data
}, (err: AxiosError) => {
  nProgress.done()
  return Promise.reject(err)
})

export default http